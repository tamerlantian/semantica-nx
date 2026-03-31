# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.0.7](https://github.com/tamerlantian/semantica-nx/compare/v0.0.6...v0.0.7) (2026-03-31)


### Bug Fixes

* **portal:** no cargar enlaces cuando el usuario no tiene tenant ([6e9da68](https://github.com/tamerlantian/semantica-nx/commit/6e9da68eee4be6491160ed65823cde25a21a3b37))

## [0.0.6](https://github.com/tamerlantian/semantica-nx/compare/v0.0.5...v0.0.6) (2026-03-31)


### Features

* **portal:** mostrar aviso de cuenta no verificada en página de reenvío ([6310453](https://github.com/tamerlantian/semantica-nx/commit/631045333b673142ac7843f74545ac41a66d6b7e))


### Bug Fixes

* **portal:** redirigir a reenvío de verificación cuando cuenta no está verificada ([23aa1f7](https://github.com/tamerlantian/semantica-nx/commit/23aa1f7124d30f3de92c773de198c8a3499a86b9))

## [0.0.5](https://github.com/tamerlantian/semantica-nx/compare/v0.0.4...v0.0.5) (2026-03-31)


### Features

* **core:** agregar utilidades de fecha ([6a14430](https://github.com/tamerlantian/semantica-nx/commit/6a14430f11f8171d8ef814f05b06c0231383f2fb))
* **portal:** agregar componente de enlaces rápidos en inicio ([2c760a7](https://github.com/tamerlantian/semantica-nx/commit/2c760a74ced4da384e36c2190da9040c83e7abb7))
* **portal:** mostrar programación del mes actual y siguiente ([0a1d52f](https://github.com/tamerlantian/semantica-nx/commit/0a1d52fb09fad2f503964e3af18862f6880f8bad))
* **portal:** rediseñar página de perfil con endpoint de detalle ([53b365e](https://github.com/tamerlantian/semantica-nx/commit/53b365e5714052bd44f3978546309a08c3e73fe5))


### Bug Fixes

* **portal:** corregir recorte del menú de usuario en móvil ([a03c845](https://github.com/tamerlantian/semantica-nx/commit/a03c8455f5d2c3a4e3036fc55bd93db248dc5db8))

## [0.0.4](https://github.com/tamerlantian/semantica-nx/compare/v0.0.3...v0.0.4) (2026-03-31)


### Features

* **core:** agregar whatsappPhone a SemanticaEnvironment y environments del portal ([1433791](https://github.com/tamerlantian/semantica-nx/commit/1433791e58f8116a38d1d571ec7e290d509a88d4))
* **portal:** agregar diálogo de consignas en turnos ([17175c1](https://github.com/tamerlantian/semantica-nx/commit/17175c1b9dc7a5041497d7ddb75d07afa0cc4cc0))
* **portal:** agregar módulo de perfil y menú de usuario en navbar ([9e155d6](https://github.com/tamerlantian/semantica-nx/commit/9e155d61d69d6cf16934c8830310340f7a86cee3))


### Refactoring

* **portal:** centralizar número de WhatsApp usando token ENVIRONMENT ([9201245](https://github.com/tamerlantian/semantica-nx/commit/920124511704f2418722de981ef7fa94eabc40ef))

## [0.0.3](https://github.com/tamerlantian/semantica-nx/compare/v0.0.1...v0.0.3) (2026-03-31)


### Features

* **portal:** agregar diálogo de creación de solicitudes y validador de rango de fechas ([d1e74e7](https://github.com/tamerlantian/semantica-nx/commit/d1e74e7709b285fd19e76330fa1cb23039eae9c3))
* **portal:** agregar diálogo de ficheros adjuntos en solicitudes ([8b2ecbb](https://github.com/tamerlantian/semantica-nx/commit/8b2ecbbd9bdfd6428b5f4a5d26ad894c726d7298))
* **portal:** agregar tags de estado en solicitudes y reordenar menú lateral ([d591fb9](https://github.com/tamerlantian/semantica-nx/commit/d591fb9ced0e5fc26bcfa9aa5ff8e499082c7d5b))
* **portal:** aplicar estándar visual a capacitaciones, créditos y anticipo de nómina ([3f02aba](https://github.com/tamerlantian/semantica-nx/commit/3f02aba29400df09404ace64afee6ab37cff617a))
* **portal:** implementar lista de solicitudes con paginación lazy ([ef9de5e](https://github.com/tamerlantian/semantica-nx/commit/ef9de5e144c37369c7f1fe46f7162cc4380b2dbf))
* **portal:** rediseñar diálogo de ficheros y agregar listado general de adjuntos ([7d455a8](https://github.com/tamerlantian/semantica-nx/commit/7d455a8c2f3ee08329742ef83332f0f8aeea2f74))


### Refactoring

* mover FicherosDialogComponent y modelo Fichero a librerías compartidas ([a178189](https://github.com/tamerlantian/semantica-nx/commit/a178189a8f4e426a9e3728befedab79a8c8b0540))
* **portal:** deshabilitar créditos y anticipo de nómina, ajustes en turnos ([b75ec95](https://github.com/tamerlantian/semantica-nx/commit/b75ec951ea1ee8697597f99b70e3f6476b4af9cc))
* **portal:** mover calendario de programaciones al módulo de turnos ([345961c](https://github.com/tamerlantian/semantica-nx/commit/345961c59ffa07adb118494a1887fe3a880370dc))
* **portal:** reemplazar p-accordion por navegación custom en shell sidebar ([0e617cb](https://github.com/tamerlantian/semantica-nx/commit/0e617cb6d63108a2f06e18db0344088c84167a64))
* **portal:** separar programaciones y reportes de programación del módulo de turnos ([7daae0d](https://github.com/tamerlantian/semantica-nx/commit/7daae0d041853305f9e77a6b7df36c2111511dab))
* **portal:** unificar diálogo de ficheros con lista y carga por solicitud ([63e3645](https://github.com/tamerlantian/semantica-nx/commit/63e36455df10a88dd2f3ea9439dd496d43172e9f))

## [0.0.2](https://github.com/tamerlantian/semantica-nx/compare/v0.0.1...v0.0.2) (2026-03-31)


### Features

* **portal:** agregar diálogo de creación de solicitudes y validador de rango de fechas ([d1e74e7](https://github.com/tamerlantian/semantica-nx/commit/d1e74e7709b285fd19e76330fa1cb23039eae9c3))
* **portal:** agregar diálogo de ficheros adjuntos en solicitudes ([8b2ecbb](https://github.com/tamerlantian/semantica-nx/commit/8b2ecbbd9bdfd6428b5f4a5d26ad894c726d7298))
* **portal:** agregar tags de estado en solicitudes y reordenar menú lateral ([c8deffc](https://github.com/tamerlantian/semantica-nx/commit/c8deffc847395d09d6ad9a2f17b8076721550197))
* **portal:** aplicar estándar visual a capacitaciones, créditos y anticipo de nómina ([aa32134](https://github.com/tamerlantian/semantica-nx/commit/aa321345ff4759d5f0b3525d37bb957d960c71bd))
* **portal:** implementar lista de solicitudes con paginación lazy ([ef9de5e](https://github.com/tamerlantian/semantica-nx/commit/ef9de5e144c37369c7f1fe46f7162cc4380b2dbf))
* **portal:** rediseñar diálogo de ficheros y agregar listado general de adjuntos ([7d455a8](https://github.com/tamerlantian/semantica-nx/commit/7d455a8c2f3ee08329742ef83332f0f8aeea2f74))


### Refactoring

* mover FicherosDialogComponent y modelo Fichero a librerías compartidas ([0527ace](https://github.com/tamerlantian/semantica-nx/commit/0527acec15915f90c728a00777f28c7eec64bcb2))
* **portal:** mover calendario de programaciones al módulo de turnos ([99a968a](https://github.com/tamerlantian/semantica-nx/commit/99a968a2cd2d89e7a07c9d4f19bbd53b47100ee2))
* **portal:** reemplazar p-accordion por navegación custom en shell sidebar ([54aaf99](https://github.com/tamerlantian/semantica-nx/commit/54aaf99dd309cfb84253b6c3b103f194559487d2))
* **portal:** separar programaciones y reportes de programación del módulo de turnos ([7daae0d](https://github.com/tamerlantian/semantica-nx/commit/7daae0d041853305f9e77a6b7df36c2111511dab))
* **portal:** unificar diálogo de ficheros con lista y carga por solicitud ([63e3645](https://github.com/tamerlantian/semantica-nx/commit/63e36455df10a88dd2f3ea9439dd496d43172e9f))

## [0.0.1](https://github.com/tamerlantian/semantica-nx/compare/v0.0.0...v0.0.1) (2026-03-28)


### Features

* **certificado-laboral:** conectar botón imprimir y agregar columnas a tabla ([a05a4c8](https://github.com/tamerlantian/semantica-nx/commit/a05a4c854442876a93ff8db78c01481a8a650943))
* **portal, seguridad:** mostrar nombre de empresa en navbar ([0f0006c](https://github.com/tamerlantian/semantica-nx/commit/0f0006cebd964b4a124a63e19b3068915fc7dd3f))


### Refactoring

* **core:** mover tenant_id de BaseUsuario a modelos de cada app ([e4dc8d6](https://github.com/tamerlantian/semantica-nx/commit/e4dc8d6374c64915e2c365437419bc9164db5c01))
* **portal:** extraer diálogo asociar empresa a componente con autocomplete ([2d58144](https://github.com/tamerlantian/semantica-nx/commit/2d58144dc43f7d9da678490dbbbba9c7850dcef7))


### Documentation

* agregar README del monorepo ([a4a0e7c](https://github.com/tamerlantian/semantica-nx/commit/a4a0e7c78103029510132f60916664c4e2f903b0))

## 0.0.0 (2026-03-28)


### Features

* inicio module ([f9074d0](https://github.com/tamerlantian/semantica-nx/commit/f9074d0cf777654ee665675cec55b93f5872a270))


### Bug Fixes

* dev to staging server and prod to prod server yml settings ([a7a29c7](https://github.com/tamerlantian/semantica-nx/commit/a7a29c7cf241e82f2f1a0749855885985c3f9c0d))
* module boundaries ([2ba4d5f](https://github.com/tamerlantian/semantica-nx/commit/2ba4d5f029573785d32b03cea7ed5c8859d288bb))
* removed test affected ([55cfaa2](https://github.com/tamerlantian/semantica-nx/commit/55cfaa28d158cc8e512fc75e02759c3a63c8f596))
* wrong built output dir ([03652f9](https://github.com/tamerlantian/semantica-nx/commit/03652f930ec31f9c19447cb5a3b33bd2d23a4a37))
