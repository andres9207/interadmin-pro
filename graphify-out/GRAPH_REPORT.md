# Graph Report - WEBPAC-INTERVE  (2026-11-17)

## Corpus Check
- 703 files · ~418,606 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4482 nodes · 12716 edges · 244 communities (130 shown, 114 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 166 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a274a6c0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- PoliciesTab.jsx
- providers.routes.js
- dependencies
- server/package.json
- providers.service.js
- constants.js
- workScopeOf
- InvoiceFormPage.jsx
- ConceptDialog.jsx
- WorksPage.jsx
- auditContext
- statements.service.js
- client/package.json
- @tabler/icons-react
- expirationNotice.service.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- decimal
- `tbl_users`
- users.service.js
- getIO
- contractSuspensions.service.test.js
- App.jsx
- contractPolicies.service.js
- contracts.controller.test.js
- invoiceGlosses.service.js
- MenuList/index.jsx
- NewProviderDialog.jsx
- @mui/material
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- fMoneyText
- contracts.controller.js
- cron/index.js
- works.service.js
- validation.utils.js
- devDependencies
- GeneralDashboard.jsx
- react-router-dom
- scripts
- AuthenticationRoutes.jsx
- `tbl_contracts`
- StatementReportDialog.jsx
- app.js
- advanceTerms.js
- invoiceTerms.js
- `tbl_contract_type_fields`
- simpleInvoiceTerms.js
- transaction.mock.js
- scripts
- WorkContracts.jsx
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- WorkSummaryTab.jsx
- permission
- devDependencies
- ref_fs
- prisma-drift.mjs
- seed.demo.js
- auth.service.test.js
- `tbl_contract_status_history`
- status.constants.js
- `tbl_status`
- useAuth
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- app.routes.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- ContractDetailPage.jsx
- export.service.js
- works.service.test.js
- error.middleware.js
- app.service.test.js
- `tbl_providers`
- serviceWorker.jsx
- session.service.js
- audit.service.js
- DocumentManagement.jsx
- ImageList.jsx
- `tbl_providers`
- glossFields.js
- ci-summary.mjs
- WorkPoliciesTab.jsx
- retentionTerms.js
- contracts.service.js
- PolicyTypePage.jsx
- advanceFilters.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- liquidationTerms.js
- `tbl_user_permissions`
- statements.routes.js
- mailerService.js
- health.service.js
- NotificationSection/index.jsx
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- constant.js
- `tbl_users`
- balanceReconciliation.service.test.js
- addressTypes.service.js
- winston.config.js
- fDateOnly
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- ContactsEditor.jsx
- ProviderTypeFieldsDialog.jsx
- WorkCosts.jsx
- decisionReferences.guard.test.js
- useSummaryDrill.jsx
- contractNotifications.service.test.js
- dashboard.service.test.js
- session.service.test.js
- main.routes.js
- ref_jest_globals
- dateOnlyText
- `tbl_invoices`
- `tbl_invoices`
- policyTypes.service.test.js
- `tbl_statements`
- funciones.js
- invoiceGlosses.service.test.js
- invoiceFollowUps.service.test.js
- uniqueConstraints.constants.test.js
- contractFields.js
- transaction.service.test.js
- permissions.controller.test.js
- `tbl_works`
- `tbl_status`
- `tbl_sessions`
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- DebouncedInput.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 154 edges
2. `react` - 120 edges
3. `showError()` - 104 edges
4. `workScopeOf()` - 94 edges
5. `moneyText()` - 91 edges
6. `dateOnlyText()` - 88 edges
7. `writeAudit()` - 81 edges
8. `useAuth()` - 79 edges
9. `withLockedTransaction()` - 77 edges
10. `fMoneyText()` - 72 edges

## Surprising Connections (you probably didn't know these)
- `getInvoiceFormOptions()` --calls--> `getContractFormOptions()`  [EXTRACTED]
  server/src/modules/billing/invoices/invoices.service.js → server/src/modules/work/contracts/contracts.service.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `selectWorkManagers()` --calls--> `userFullName()`  [EXTRACTED]
  server/src/modules/work/works/works.service.js → server/src/common/utils/user.utils.js

## Import Cycles
- None detected.

## Communities (244 total, 114 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.08
Nodes (25): Alert(), Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), Chip() (+17 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "PoliciesTab.jsx"
Cohesion: 0.14
Nodes (22): contractPoliciesApi, getInsurersSelectAPI, getPolicyTypesSelectAPI, ActionButton(), toneOf(), ConfirmDialog(), DataTable(), TableActions() (+14 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (36): canViewAllWorks(), exportFormatRule(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController (+28 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (39): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+31 more)

### Community 6 - "providers.service.js"
Cohesion: 0.06
Nodes (79): findExportRows(), renderExport(), assertInScope(), containsFilter(), filtersWhere(), idFilter(), identificationError(), exportContracts() (+71 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (75): contractsApi, exportContractAPI(), exportContractsAPI(), getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), refreshSession() (+67 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (89): workScopeOf(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController (+81 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (60): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoicesApi, ADR-0017, previewContractInvoiceAPI() (+52 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (49): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+41 more)

### Community 11 - "WorksPage.jsx"
Cohesion: 0.06
Nodes (48): exportProvidersAPI(), exportWorksAPI(), getMyWorksSelectAPI(), getWorkFilterManagersAPI(), getWorkFilterProvidersAPI(), getWorksSummaryAPI(), worksApi, instance (+40 more)

### Community 12 - "auditContext"
Cohesion: 0.13
Nodes (24): THEME_MODES, auditContext(), forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController() (+16 more)

### Community 13 - "statements.service.js"
Cohesion: 0.08
Nodes (55): GLOSS_FIELD_NAMES, statementGlosses(), statementsGlosses(), statementsWithGlosses(), statementInvoices(), affectingValueOf(), amountColumnsOf(), amountTotalsOf() (+47 more)

### Community 14 - "client/package.json"
Cohesion: 0.03
Nodes (62): asWarnings(), compat, __dirname, __filename, isOff(), browserslist, development, production (+54 more)

### Community 15 - "@tabler/icons-react"
Cohesion: 0.08
Nodes (37): deleteProfileAPI(), paginationProfilesAPI(), paginationStatementGroupsAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS (+29 more)

### Community 16 - "expirationNotice.service.js"
Cohesion: 0.06
Nodes (43): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+35 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.10
Nodes (50): moneyText(), ratioPercent(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf() (+42 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.12
Nodes (22): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0025, ADR-0026 (+14 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (113): ADR-0013, ADR-0021, ADR-0023, server_src_common_utils_money_utils_percentfor, invoiceAdvanceWhere(), billingBalances(), isBillingType(), CONTRACT_TAX_FIELDS (+105 more)

### Community 22 - "decimal"
Cohesion: 0.09
Nodes (46): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText(), RATIO_SCALE (+38 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "users.service.js"
Cohesion: 0.08
Nodes (33): ADR-0004, countByStatus(), DEFAULT_ROWS, paginate(), resolvePagination(), searchWhere(), toInt(), USER_NAME_SELECT (+25 more)

### Community 25 - "getIO"
Cohesion: 0.09
Nodes (26): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+18 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (24): KEY_TO_ID, typeFieldRows(), ctx, ADR-0016, ADR-0027, notifyWorkManagers, prismaMock, state (+16 more)

### Community 27 - "App.jsx"
Cohesion: 0.08
Nodes (32): App(), ThemedToastContainer(), config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, AuthContext, ConfigContext (+24 more)

### Community 28 - "contractPolicies.service.js"
Cohesion: 0.03
Nodes (125): scopeWhere(), MAX_ROWS, DEFAULT_EXPIRING_DAYS, FIELD_BY_KEY, getRuleValues(), httpError(), ADR-0002, policyExpiringDays() (+117 more)

### Community 29 - "contracts.controller.test.js"
Cohesion: 0.04
Nodes (44): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+36 more)

### Community 30 - "invoiceGlosses.service.js"
Cohesion: 0.07
Nodes (75): AUDIT_ENTITIES, diffFields(), writeAudit(), withLockedTransaction(), updateAccount(), updatePassword(), assertReleaser(), auditable() (+67 more)

### Community 31 - "MenuList/index.jsx"
Cohesion: 0.07
Nodes (24): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), admin, icons (+16 more)

### Community 32 - "NewProviderDialog.jsx"
Cohesion: 0.09
Nodes (39): getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi (+31 more)

### Community 33 - "@mui/material"
Cohesion: 0.05
Nodes (73): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoiceTransitionsApi, getModulesAPI() (+65 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "fMoneyText"
Cohesion: 0.10
Nodes (51): useSchemePalette(), fMoneyText(), InvoiceDetailPanel(), AdvanceBar(), glossRows(), invoiceRows(), advanceDrill(), CardTitle() (+43 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.04
Nodes (86): getEffectivePermissionIds(), moneyRule(), optionalDate(), percentRule(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002 (+78 more)

### Community 39 - "cron/index.js"
Cohesion: 0.11
Nodes (18): ref_http, node-cron, app, server, describeTarget(), testConnection(), STATUS_IDS, verifyStatusCatalog() (+10 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (49): ADR-0007, ADR-0009, dateRangeFilter(), PROGRESS_WARNING, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections() (+41 more)

### Community 41 - "validation.utils.js"
Cohesion: 0.11
Nodes (21): express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule(), ADR-0027 (+13 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "GeneralDashboard.jsx"
Cohesion: 0.15
Nodes (22): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+14 more)

### Community 45 - "react-router-dom"
Cohesion: 0.13
Nodes (27): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), setParentOpenedMenu(), useMenuCollapse(), Footer() (+19 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "AuthenticationRoutes.jsx"
Cohesion: 0.11
Nodes (21): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+13 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.15
Nodes (20): exportStatementGroupAPI(), getStatementGroupReportAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton(), ExportDialog() (+12 more)

### Community 51 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 52 - "advanceTerms.js"
Cohesion: 0.18
Nodes (17): CONTRACT_ADVANCE_FILTERS, advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto(), defaultAmortization() (+9 more)

### Community 53 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (25): assertTransition(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, glossWhere(), historyRow(), httpError(), INVOICE_ALERT_NAMES (+17 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "simpleInvoiceTerms.js"
Cohesion: 0.13
Nodes (22): hasContractTaxes(), amountsDto(), listAmounts(), previewSimpleInvoice(), blank(), composeSimpleInvoice(), FORMULAS, hasSimpleAmounts() (+14 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (43): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+35 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "WorkContracts.jsx"
Cohesion: 0.17
Nodes (23): AlertChips(), ADVANCE_LEVELS, AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend(), num, pendingStripes() (+15 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.15
Nodes (20): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), AuthProvider() (+12 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "WorkSummaryTab.jsx"
Cohesion: 0.21
Nodes (21): contractRows(), daysOpenText(), DrillDownDialog(), followUpRows(), followUpsDrill(), num, useDrillDown(), initialsOf() (+13 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "ref_fs"
Cohesion: 0.11
Nodes (14): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+6 more)

### Community 68 - "prisma-drift.mjs"
Cohesion: 0.18
Nodes (11): columnList(), database, dbForeignKeys, equivalent, isNoise(), prisma, real, rows (+3 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.03
Nodes (85): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+77 more)

### Community 71 - "auth.service.test.js"
Cohesion: 0.14
Nodes (11): ref_crypto, deriveKey(), hashResetCode(), ADR-0001, verifyResetCode(), activeUser, mockComparePassword, mockHashPassword (+3 more)

### Community 88 - "status.constants.js"
Cohesion: 0.06
Nodes (46): adapter, prisma, ACTIVE_STATUS, DELETED_STATUS, hasEffectivePermission(), ALL, assertAnyInScope(), httpError() (+38 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (84): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), providerTypesApi, reasonsApi (+76 more)

### Community 100 - "works.routes.js"
Cohesion: 0.08
Nodes (34): managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController (+26 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.32
Nodes (6): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_contract_fields`, `tbl_provider_types`

### Community 105 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "notifications.service.js"
Cohesion: 0.23
Nodes (14): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+6 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "ContractDetailPage.jsx"
Cohesion: 0.06
Nodes (79): getStatusesByScopeAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), useSocket(), ContactsList(), ADR-0009, DataList() (+71 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (58): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+50 more)

### Community 118 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

### Community 123 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 124 - "session.service.js"
Cohesion: 0.16
Nodes (19): ADR-0001, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+11 more)

### Community 125 - "audit.service.js"
Cohesion: 0.06
Nodes (56): AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0001, ADR-0027, protect(), REDACTED, SENSITIVE_FIELDS (+48 more)

### Community 129 - "DocumentManagement.jsx"
Cohesion: 0.14
Nodes (18): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+10 more)

### Community 130 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "glossFields.js"
Cohesion: 0.13
Nodes (19): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain() (+11 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "WorkPoliciesTab.jsx"
Cohesion: 0.15
Nodes (15): getWorkDashboardAPI(), ADR-0002, ACTION_TONES, ContractBalanceCards(), DashboardCards(), Indicator(), ADR-0002, TABS (+7 more)

### Community 136 - "retentionTerms.js"
Cohesion: 0.20
Nodes (15): @prisma/client, ratioText(), revalidateOnApprove(), assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025 (+7 more)

### Community 137 - "contracts.service.js"
Cohesion: 0.05
Nodes (120): ADR-0006, main(), newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused() (+112 more)

### Community 140 - "PolicyTypePage.jsx"
Cohesion: 0.16
Nodes (14): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog(), ADR-0019 (+6 more)

### Community 142 - "advanceFilters.js"
Cohesion: 0.14
Nodes (15): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024, registered (+7 more)

### Community 151 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.09
Nodes (34): sendExport(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController (+26 more)

### Community 154 - "mailerService.js"
Cohesion: 0.15
Nodes (16): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+8 more)

### Community 155 - "health.service.js"
Cohesion: 0.33
Nodes (5): DB_TIMEOUT_MS, getHealth(), SERVICE_NAME, withTimeout(), prismaMock

### Community 156 - "NotificationSection/index.jsx"
Cohesion: 0.26
Nodes (12): getNotificationCountAPI(), markAllAsReadAPI(), markAsReadAPI(), paginationNotificationsAPI(), inActiveWork(), NotificationSection(), targetOf(), HeaderAvatar() (+4 more)

### Community 157 - "importCase.guard.test.js"
Cohesion: 0.20
Nodes (14): clientRoots, entries(), files(), gitMismatches, listing, lookup(), mismatches, realName() (+6 more)

### Community 159 - "images.js"
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "constant.js"
Cohesion: 0.25
Nodes (11): appDrawerWidth, gridSpacing, CardSecondaryAction(), SubCard(), Avatar(), ColorBox(), UIColor(), CustomShadowBox() (+3 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.20
Nodes (10): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_gloss_fields`, `tbl_invoice_glosses` (+2 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "addressTypes.service.js"
Cohesion: 0.24
Nodes (9): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText(), addressTypesRoutes, addressTypesConfig, addressTypesService (+1 more)

### Community 181 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 183 - "fDateOnly"
Cohesion: 0.11
Nodes (14): fTerm(), fPercentText(), fDateOnly(), SHORT_MONTHS, fieldsSentence(), originText(), ReleaseGlossesSection(), ConceptsTab() (+6 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

### Community 197 - "ProviderTypeFieldsDialog.jsx"
Cohesion: 0.31
Nodes (9): getProviderTypeFieldsAPI(), saveProviderTypeFieldsAPI(), DATA_TYPE_NAMES, GROUP_NAMES, ADR-0006, ProviderTypeFieldsDialog(), toggle(), toRow() (+1 more)

### Community 198 - "WorkCosts.jsx"
Cohesion: 0.24
Nodes (9): CardTitle(), clickableChartSx, drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor(), num (+1 more)

### Community 199 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 201 - "useSummaryDrill.jsx"
Cohesion: 0.32
Nodes (7): getDashboardDetailAPI(), EMPTY_FILTERS, ROWS_BY_KIND, SEARCH_HINTS, SearchField(), useSummaryDrill(), WITHOUT_WORK_FILTER

### Community 202 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 203 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 204 - "session.service.test.js"
Cohesion: 0.11
Nodes (11): dbUser, mockDisconnectSockets, mockIn, prismaMock, user, mockGetBasicInformation, mockLogin, mockUpdateAccount (+3 more)

### Community 206 - "main.routes.js"
Cohesion: 0.05
Nodes (51): express, supertest, verifyToken(), requirePermission(), validate(), IDEMPOTENCY_HEADER, createMasterControllers(), createMasterRouter() (+43 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (22): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+14 more)

### Community 212 - "dateOnlyText"
Cohesion: 0.07
Nodes (58): addTerm(), dateOnlyText(), daysInMonth(), PROGRESS_CRITICAL, progressLevel(), TERM_UNITS, termProgress(), toDateOnly() (+50 more)

### Community 217 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.13
Nodes (8): assertContractInScope, assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state, VALUE_LINE

### Community 221 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "contractFields.js"
Cohesion: 0.08
Nodes (23): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+15 more)

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "permissions.controller.test.js"
Cohesion: 0.40
Nodes (3): forged, ADR-0013, permissionsServiceMock

### Community 237 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

## Knowledge Gaps
- **1221 isolated node(s):** `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS`, `filterOptions`, `INTERNAL_UNIQUE_CONSTRAINTS` (+1216 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1673 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **114 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0017` connect `permissions.constants.js` to `invoices.service.js`, `seed.demo.js`, `constants.js`?**
  _High betweenness centrality (0.271) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `DocumentManagement.jsx`, `PoliciesTab.jsx`, `ImageList.jsx`, `WorkPoliciesTab.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `WorksPage.jsx`, `PolicyTypePage.jsx`, `client/package.json`, `@tabler/icons-react`, `App.jsx`, `NotificationSection/index.jsx`, `MenuList/index.jsx`, `NewProviderDialog.jsx`, `fMoneyText`, `GeneralDashboard.jsx`, `react-router-dom`, `constant.js`, `AuthenticationRoutes.jsx`, `StatementReportDialog.jsx`, `fDateOnly`, `WorkContracts.jsx`, `AuthForgotPassword.jsx`, `WorkSummaryTab.jsx`, `ContactsEditor.jsx`, `ProviderTypeFieldsDialog.jsx`, `WorkCosts.jsx`, `useSummaryDrill.jsx`, `useAuth`, `ContractDetailPage.jsx`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `STATUS_NAMES`, `ROWS_PER_PAGE_OPTIONS`, `NO_FIELDS` to the rest of the system?**
  _1221 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07918367346938776 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `PoliciesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._