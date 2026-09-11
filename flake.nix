{
  description = "react-training.sacha.house static website";

  nixConfig = {
    extra-substituters = [ "https://nix-community.cachix.org" ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2605";
    flake-utils.url = "github:numtide/flake-utils";
    git-hooks = {
      url = "https://flakehub.com/f/cachix/git-hooks.nix/0.1";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      git-hooks,
      ...
    }:
    flake-utils.lib.eachSystem [ "x86_64-linux" "aarch64-linux" ] (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfreePredicate = package: nixpkgs.lib.getName package == "nomad";
        };
        inherit (pkgs) lib;
        packageJson = builtins.fromJSON (builtins.readFile ./package.json);
        pname = "react-training-sacha-house";
        inherit (packageJson) version;
        nodejs = pkgs.nodejs_22;
        pnpm = pkgs.pnpm.override { nodejs-slim = nodejs; };
        src = lib.cleanSource ./.;
        pnpmDeps = pkgs.fetchPnpmDeps {
          inherit
            pname
            version
            src
            pnpm
            ;
          fetcherVersion = 4;
          hash = "sha256-DMFe9nkE9oMLeaS1qYds5hjvzwExpAWrl4ql7sWtfww=";
        };
        site = pkgs.stdenvNoCC.mkDerivation {
          inherit
            pname
            version
            src
            pnpmDeps
            ;
          nativeBuildInputs = [
            nodejs
            pkgs.pnpmConfigHook
            pnpm
          ];
          pnpmInstallFlags = [ "--frozen-lockfile" ];
          buildPhase = ''
            runHook preBuild
            pnpm run build
            runHook postBuild
          '';
          installPhase = ''
            runHook preInstall
            cp -r dist "$out"
            runHook postInstall
          '';
        };
        server = pkgs.writeShellApplication {
          name = pname;
          runtimeInputs = [ pkgs.busybox ];
          text = ''
            exec httpd -f -p 3000 -h ${site}
          '';
        };
        dockerImage = pkgs.dockerTools.buildLayeredImage {
          name = "react-training.sacha.house";
          tag = version;
          contents = [ server ];
          config = {
            Cmd = [ "${server}/bin/${pname}" ];
            ExposedPorts."3000/tcp" = { };
            User = "65532:65532";
          };
        };
        preCommitCheck = git-hooks.lib.${system}.run {
          package = pkgs.prek;
          src = ./.;
          hooks = {
            actionlint.enable = true;
            check-added-large-files.enable = true;
            check-json = {
              enable = true;
              excludes = [ "^tsconfig.*\\.json$" ];
            };
            check-merge-conflicts.enable = true;
            end-of-file-fixer.enable = true;
            nixfmt.enable = true;
            trim-trailing-whitespace.enable = true;
          };
        };
        nomadJobs = pkgs.runCommand "${pname}-nomad-jobs" { nativeBuildInputs = [ pkgs.nomad ]; } ''
          image="ghcr.io/sachahjkl/react-training.sacha.house@sha256:0000000000000000000000000000000000000000000000000000000000000000"
          nomad job validate -var "image=$image" ${./deploy/nomad/staging.nomad.hcl}
          nomad job validate -var "image=$image" ${./deploy/nomad/production.nomad.hcl}
          touch "$out"
        '';
      in
      {
        packages = {
          default = site;
          inherit dockerImage;
        };
        checks = {
          build = site;
          inherit dockerImage nomadJobs;
          pre-commit = preCommitCheck;
        };
        formatter = pkgs.nixfmt;
        devShells.default = pkgs.mkShell {
          packages = [
            nodejs
            pnpm
          ]
          ++ preCommitCheck.enabledPackages;
          inherit (preCommitCheck) shellHook;
        };
      }
    );
}
