# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- About view
- CHANGELOG.md
### Changed
- Rewording : external links -> public links
- Redesign configuration view
- replace X icon on configuration view by Save icon

## [4.0.0] <font size="2">*- 2022-02-14*</font>
### Changed
- Move project to Angular 13 + Bootstrap
- Move extension (not conf generator) to Github
- Refactor configuration view
### Fixed
- All option not selected at first extension usage
- Exclude DEV from version filters
- Colors of switch fixed for dark theme

## 3.12 <font size="2">*- 2022-02-01*</font>
### Changed
- Fix style for switch
- Update logos
### Fixed
- SSH slave link in configuration generation
- Close extension popup when AWS role button is clicked

## 3.11 <font size="2">*- 2022-02-01*</font>
### Added
- AWS role switch link
- Release note view
- Versions filter
### Changed
- CSS improvement
- Transform all modules in Javascript classes

## 3.10 <font size="2">*- 2022-01-24*</font>
### Added
- Dark mode theme

## 3.9 <font size="2">*- 2022-01-12*</font>
### Added
- Add "no result" message on environments list
### Changed
- Refactoring build
- CSS improvement

## 3.8 <font size="2">*- 2022-01-06*</font>
### Fixed
- CSS issue

## 3.7 <font size="2">*- 2022-01-06*</font>
### Added
- Introduce MPA in environments list
### Fixed
- Manage empty urls

## 3.6 <font size="2">*- 2022-01-05*</font>
### Fixed
- Firefox code smells

## 3.5 <font size="2">*- 2022-01-05*</font>
### Added
- Add extension version at the bottom of configuration screen
### Changed
- Firefox CSS improvements
- Improve CSS for configuration view
### Fixed
- Firefox code smells

## 3.4 <font size="2">*- 2022-01-04*</font>
### Added
- Add `Only icon` option

## 3.3 <font size="2">*- 2022-01-04*</font>
### Added
- Introduce the `updates.json` file for Firefox auto update
- Clear search field button
### Changed
- Design improvement
### Fixed
- Tooltip bug

## 3.2 <font size="2">*- 2021-12-23*</font>
### Changed
- Rework loader to css animated one

## 3.1 <font size="2">*- 2021-12-23*</font>
### Added
- Extended search (thanks [Mathieu Soysal](https://github.com/MathieuSoysal))
- Result counter
### Changed
- Refactoring code (create module for each configuration, rendering, search and utils components)
- Rewording
- CSS improvement

## 3.0 <font size="2">*- 2021-12-22*</font>
### Fix
- Control that configuration url is raw one

## 2.11 <font size="2">*- 2021-12-18*</font>
### Changed
- Remove external link for health check
- Manage configuration file renaming (`occ-env-urls.json` to `configuration.json`)
- Redesign scrollbars
- Redesign list
- Redesign configuration screen
- Display option for external links
- CMDB file type option

## 2.10 <font size="2">*- 2021-12-18*</font>
### Added
- Add client domain in list and configure the display
- Introduce lodash lib
### Changed
- Rewording
- Style in configuration panel for client name domain version, same as the list one
- Refactor configuration object

## 2.9 <font size="2">*- 2021-12-16*</font>
### Added
- Introduce Firefox version
### Changed
- Refactor project structure to manager cross browser compatibility
- Insert maven project version in manifest.json
### Fixed
- Typo

## 2.8 <font size="2">*- 2021-12-14*</font>
### Added
- Manage transition between v1 and v2 configuration file
### Fixed
- Environment type issue

## 2.7 <font size="2">*- 2021-11-26*</font>
### Added
- Portal and SSH Links
- Close button for configuration view
- Display links switch buttons in configuration screen
- Manage transition between v1 and v2 configuration file
### Changed
- Design reworking

## 2.4 <font size="2">*- 2021-11-25*</font>
### Added
- Add CMDB link
- Ignore MP01 in environments list
- Environment types (DEV/INT/QA/PREPROD/PROD/Others)
- Introduce Mustache.js to generate environment list

## 2.3 <font size="2">*- 2021-07-23*</font>
### Added
- Commit extension package
### Changed
- Rewording
- CSS improvement
### Fixed
- Configuration message hiding
### Removed
- Delete extension ZIP

## 2.1 <font size="2">*- 2021-07-22*</font>
### Added
- Add OCC Version per environments
### Changed
- Rewording
- CSS improvement
### Fixed
- Error message hiding

## 2.0 <font size="2">*- 2021-07-19*</font>
### Added
- Setup project (maven, jenkins)
- Setup Bootstrap & jQuery
- Error message
- URL Configuration view
- Loading view
- Environment view

## [0.0.7] <font size="2">*- 2015-02-16*</font>
### Added
- Link, and make it obvious that date format is ISO 8601.
### Changed
- Clarified the section on "Is there a standard change log format?".
### Removed
- Remove empty sections from CHANGELOG, they occupy too much space and
  create too much noise in the file. People will have to assume that the
  missing sections were intentionally left out because they contained no
  notable changes.
### Fixed
- Fix Markdown links to tag comparison URL with footnote-style links.

[Unreleased]: https://github.com/guitaro/odigo-environment-linker/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.0.0
What is a changelog?