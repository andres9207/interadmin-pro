# Graph Report - WEBPAC-INTERVE  (2026-11-17)

## Corpus Check
- 703 files · ~418,665 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4481 nodes · 12715 edges · 251 communities (137 shown, 114 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 166 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a17b6711`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- overrides/index.js
- dependencies
- contractReports.service.js
- providers.routes.js
- dependencies
- server/package.json
- providers.service.js
- constants.js
- workScopeOf
- InvoiceFormPage.jsx
- ConceptDialog.jsx
- WorkScopeContext.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- react
- expirationNotice.service.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- decimal
- `tbl_users`
- users.service.js
- socket.js
- contractConcepts.service.test.js
- withAlpha
- dashboard.service.js
- invoices.controller.test.js
- writeAudit
- menu-items/index.js
- invoiceGlosses.service.js
- showError
- `tbl_contract_concepts`
- client_src_assets_images_logo_interve
- providers.service.test.js
- WorkChartsTab.jsx
- contracts.controller.js
- cron/index.js
- works.service.js
- validation.utils.js
- devDependencies
- @mui/material
- MainLayout/index.jsx
- scripts
- AuthenticationRoutes.jsx
- `tbl_contracts`
- ContractsPage.jsx
- app.js
- advanceTerms.js
- invoiceTerms.js
- `tbl_contract_type_fields`
- simpleInvoiceTerms.js
- transaction.mock.js
- scripts
- policyTerms.js
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- seed.js
- permission
- devDependencies
- ref_fs
- prisma-drift.mjs
- seed.demo.js
- App.jsx
- `tbl_contract_status_history`
- status.constants.js
- `tbl_status`
- MainRoutes.jsx
- `tbl_permissions`
- works.routes.js
- `tbl_provider_types`
- app.routes.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- useAuth
- export.service.js
- eslint.config.mjs
- error.middleware.js
- todayDateOnly
- `tbl_providers`
- serviceWorker.jsx
- session.service.js
- auth.service.js
- formatTime.js
- ImageList.jsx
- `tbl_providers`
- glossFields.js
- ci-summary.mjs
- invoiceEvidence.service.js
- retentionTerms.js
- contractPolicies.service.js
- contracts.controller.test.js
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
- balanceReconciliation.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- addressTypes.contacts.js
- winston.config.js
- contractSuspensions.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- WorksPage.jsx
- ProviderTypePage.jsx
- MenuList/index.jsx
- decisionReferences.guard.test.js
- themes/index.jsx
- contractNotifications.service.test.js
- handleFirebase.js
- session.service.test.js
- main.routes.js
- ref_jest_globals
- contracts.service.js
- `tbl_invoices`
- `tbl_invoices`
- src/index.jsx
- `tbl_statements`
- getEffectivePermissionIds
- invoiceGlosses.service.test.js
- invoiceFollowUps.service.test.js
- uniqueConstraints.constants.test.js
- contractFields.js
- transaction.service.test.js
- contractEndDateReconciliation.service.test.js
- `tbl_works`
- `tbl_status`
- `tbl_sessions`
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- dashboard.measure.js
- dashboardDetail.service.test.js
- contractCancellation.service.test.js
- users.service.test.js
- expirationNotice.service.test.js
- workScope.service.test.js
- useMenuCollapse.js
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
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (251 total, 114 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractReports.service.js"
Cohesion: 0.07
Nodes (43): findExportRows(), renderExport(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, approvedOf(), contractInvoicesForReport(), contractsBalances(), exportInvoices(), ADVANCE_COLUMNS (+35 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (34): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController, getProviderController, INPUT_FIELDS (+26 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (39): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+31 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (72): identificationError(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+64 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (63): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), refreshSession(), client_src_hooks_useinvoicemenus (+55 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (90): workScopeOf(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_listinvoicemenus, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+82 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (64): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, invoicesApi (+56 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.07
Nodes (48): contractConceptsApi, contractLiquidationApi, getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), ADR-0006 (+40 more)

### Community 11 - "WorkScopeContext.jsx"
Cohesion: 0.06
Nodes (46): getDashboardDetailAPI(), getWorkDashboardAPI(), ADR-0002, exportProvidersAPI(), providersApi, getMyWorksSelectAPI(), instance, NO_REFRESH_URLS (+38 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.07
Nodes (60): assertInScope(), containsFilter(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, resolvePagination() (+52 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (35): browserslist, development, production, eslintConfig, extends, axios, eslint, @eslint/js (+27 more)

### Community 15 - "react"
Cohesion: 0.05
Nodes (48): getStatusesByScopeAPI(), deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), saveUserAPI() (+40 more)

### Community 16 - "expirationNotice.service.js"
Cohesion: 0.15
Nodes (24): getBusinessRulesController, saveBusinessRulesController, getBusinessRules(), getRuleValues(), contractAlertWheres(), CONTRACT_ALERTS, POLICY_ALERTS, addDays() (+16 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.13
Nodes (41): moneyText(), ratioPercent(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf(), balancesOf() (+33 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.05
Nodes (44): ADR-0011, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0025, ADR-0026 (+36 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.05
Nodes (97): ADR-0013, ADR-0021, ADR-0023, ADR-0024, ADR-0027, billingBalances(), isBillingType(), server_src_modules_billing_invoices_invoicemenus_getinvoicemenu (+89 more)

### Community 22 - "decimal"
Cohesion: 0.10
Nodes (40): decimal(), HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, percentOf(), percentText(), RATIO_SCALE (+32 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "users.service.js"
Cohesion: 0.05
Nodes (64): INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint(), runIdempotent() (+56 more)

### Community 25 - "socket.js"
Cohesion: 0.24
Nodes (10): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+2 more)

### Community 26 - "contractConcepts.service.test.js"
Cohesion: 0.06
Nodes (25): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+17 more)

### Community 27 - "withAlpha"
Cohesion: 0.14
Nodes (18): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, createCustomShadow(), CustomShadows(), Alert(), Chip() (+10 more)

### Community 28 - "dashboard.service.js"
Cohesion: 0.10
Nodes (38): scopeWhere(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+30 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "writeAudit"
Cohesion: 0.06
Nodes (68): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), diffFields(), ADR-0001, ADR-0027, protect() (+60 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "invoiceGlosses.service.js"
Cohesion: 0.12
Nodes (42): glossFieldFor(), assertReleaser(), auditable(), findLockedOpenGloss(), httpError(), ADR-0027, RELEASE_AUDITED, writeGlossRelease() (+34 more)

### Community 33 - "showError"
Cohesion: 0.06
Nodes (84): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+76 more)

### Community 34 - "`tbl_contract_concepts`"
Cohesion: 0.50
Nodes (3): `tbl_status`, `tbl_users`, `tbl_contract_concepts`

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.06
Nodes (88): useSchemePalette(), AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend() (+80 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (80): auditContext(), moneyRule(), optionalDate(), percentRule(), contractIdsByAdvance(), contractTaxOnlyRules(), simpleAmountRules(), getContractMenu() (+72 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+7 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (50): ADR-0004, ADR-0007, ADR-0009, applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted() (+42 more)

### Community 41 - "validation.utils.js"
Cohesion: 0.11
Nodes (23): express-validator, EDITABLE_STATUS_VALUES, IDEMPOTENCY_HEADER, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+15 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "@mui/material"
Cohesion: 0.04
Nodes (87): getDashboardSummaryAPI(), client_src_assets_images_interadminpro, client_src_hooks_useinvoicemenus_useinvoicemenus, PrivateRoute(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle (+79 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), useConfig(), Footer(), Header(), ThemeModeSection() (+15 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "AuthenticationRoutes.jsx"
Cohesion: 0.18
Nodes (11): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router (+3 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.12
Nodes (14): `tbl_contracts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_reasons`, `tbl_users` (+6 more)

### Community 50 - "ContractsPage.jsx"
Cohesion: 0.08
Nodes (29): contractsApi, exportContractsAPI(), getContractMenuAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton() (+21 more)

### Community 51 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 52 - "advanceTerms.js"
Cohesion: 0.17
Nodes (18): advanceBalances(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto(), defaultAmortization(), httpError() (+10 more)

### Community 53 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (23): cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, glossWhere(), httpError(), INVOICE_ALERT_NAMES, INVOICE_ALERTS, INVOICE_TRANSITIONS (+15 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "simpleInvoiceTerms.js"
Cohesion: 0.11
Nodes (26): composeContractInvoice(), contractTaxesDto(), hasContractTaxes(), amountsDto(), contractSnapshot(), listAmounts(), previewSimpleInvoice(), blank() (+18 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.04
Nodes (38): baseConfig, config, prismaMock, service, lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock (+30 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "policyTerms.js"
Cohesion: 0.11
Nodes (26): insuredValue(), ADR-0019, ADR-0026, POLICY_BASES, contractPolicyStatuses(), coversTermName(), policyRows(), CLOSED_STATES (+18 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.20
Nodes (15): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+7 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "seed.js"
Cohesion: 0.11
Nodes (17): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+9 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "ref_fs"
Cohesion: 0.12
Nodes (13): ref_fs, ref_url, ALLOWED, files(), lines, SRC, catalog, expected (+5 more)

### Community 68 - "prisma-drift.mjs"
Cohesion: 0.18
Nodes (11): columnList(), database, dbForeignKeys, equivalent, isNoise(), prisma, real, rows (+3 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.06
Nodes (49): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+41 more)

### Community 71 - "App.jsx"
Cohesion: 0.12
Nodes (15): loginAPI(), logoutAPI(), verifyTokenAPI(), getPermissionsCatalogAPI(), App(), ThemedToastContainer(), AuthContext, AuthProvider() (+7 more)

### Community 88 - "status.constants.js"
Cohesion: 0.09
Nodes (35): adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, STATUS_IDS, hasEffectivePermission() (+27 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "MainRoutes.jsx"
Cohesion: 0.03
Nodes (82): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, policyTypesApi, checkProviderIdentificationAPI(), reasonsApi (+74 more)

### Community 100 - "works.routes.js"
Cohesion: 0.09
Nodes (31): changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController, INPUT_FIELDS, notify(), paginationWorksController (+23 more)

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

### Community 116 - "useAuth"
Cohesion: 0.05
Nodes (110): exportContractAPI(), getIdentityDocumentsSelectAPI, getProviderTypesSelectAPI, useAuth(), useSocket(), ConfirmDialog(), ContactsList(), ADR-0009 (+102 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (58): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+50 more)

### Community 118 - "eslint.config.mjs"
Cohesion: 0.12
Nodes (18): asWarnings(), compat, __dirname, __filename, isOff(), @eslint/compat, @eslint/eslintrc, ref_eslint_js (+10 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "todayDateOnly"
Cohesion: 0.21
Nodes (15): addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel(), TERM_UNITS, termProgress(), todayDateOnly() (+7 more)

### Community 123 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 124 - "session.service.js"
Cohesion: 0.11
Nodes (27): ADR-0001, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+19 more)

### Community 125 - "auth.service.js"
Cohesion: 0.07
Nodes (38): bcrypt, ref_crypto, REDACTED, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER (+30 more)

### Community 129 - "formatTime.js"
Cohesion: 0.14
Nodes (12): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), showPromise(), DocumentManagement(), FileRow() (+4 more)

### Community 130 - "ImageList.jsx"
Cohesion: 0.53
Nodes (4): ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.12
Nodes (13): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+5 more)

### Community 132 - "glossFields.js"
Cohesion: 0.17
Nodes (12): ref_node_fs, CONTRACT_LINES, BY_TYPE, byCatalog(), CATALOG_ORDER, fieldAmount(), GLOSS_LINES_SELECT, glossFieldsFor() (+4 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "invoiceEvidence.service.js"
Cohesion: 0.15
Nodes (14): AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval(), ADR-0013, ADR-0027, snapshotOf() (+6 more)

### Community 136 - "retentionTerms.js"
Cohesion: 0.20
Nodes (15): ratioText(), balanceChange(), revalidateOnApprove(), assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits(), httpError(), ADR-0025 (+7 more)

### Community 137 - "contractPolicies.service.js"
Cohesion: 0.06
Nodes (103): main(), newOperationId(), dateOnlyText(), policyBaseValue(), withContractAiu(), resolveContractTypeFields(), ADR-0017, REASON_SCOPES (+95 more)

### Community 140 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 142 - "advanceFilters.js"
Cohesion: 0.13
Nodes (18): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+10 more)

### Community 151 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.08
Nodes (35): sendExport(), exportFormatRule(), handleExport(), STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController (+27 more)

### Community 154 - "mailerService.js"
Cohesion: 0.17
Nodes (12): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+4 more)

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

### Community 175 - "balanceReconciliation.service.js"
Cohesion: 0.23
Nodes (12): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+4 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.20
Nodes (10): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_gloss_fields`, `tbl_invoice_glosses` (+2 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.14
Nodes (10): @prisma/client, CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients (+2 more)

### Community 179 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 181 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 183 - "contractSuspensions.service.test.js"
Cohesion: 0.13
Nodes (7): ctx, initial, ADR-0017, ADR-0027, notifyWorkManagers, prismaMock, state

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "WorksPage.jsx"
Cohesion: 0.08
Nodes (35): getAddressTypesSelectAPI, getConstructionCompaniesSelectAPI, getContractTypesSelectAPI, getSupervisionTypesSelectAPI, exportWorksAPI(), getWorkFilterManagersAPI(), getWorkFilterProvidersAPI(), getWorkManagersSelectAPI() (+27 more)

### Community 197 - "ProviderTypePage.jsx"
Cohesion: 0.13
Nodes (18): getProviderTypeFieldsAPI(), providerTypesApi, saveProviderTypeFieldsAPI(), ProviderTypePage, INVOICE_MODE_OPTIONS, invoiceModeName(), DATA_TYPE_NAMES, GROUP_NAMES (+10 more)

### Community 198 - "MenuList/index.jsx"
Cohesion: 0.23
Nodes (11): getMenuAPI(), ElevationScroll(), HorizontalBar(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts (+3 more)

### Community 199 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 201 - "themes/index.jsx"
Cohesion: 0.26
Nodes (7): config, CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, ConfigContext, ConfigProvider(), useLocalStorage()

### Community 202 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 203 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "main.routes.js"
Cohesion: 0.05
Nodes (53): express, supertest, getIO(), verifyToken(), requirePermission(), validate(), createMasterControllers(), createMasterRouter() (+45 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.03
Nodes (33): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, ALL (+25 more)

### Community 212 - "contracts.service.js"
Cohesion: 0.05
Nodes (80): ADR-0006, server_src_common_utils_money_utils_percentfor, toDateOnly(), FIELD_GROUPS, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), daysBetween(), findEndDateDiscrepancies() (+72 more)

### Community 217 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "getEffectivePermissionIds"
Cohesion: 0.31
Nodes (7): getEffectivePermissionIds(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002, getUserPermissions(), exportContractController

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
Cohesion: 0.13
Nodes (15): AIU_FIELDS, enforceFields(), fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006, ADR-0026 (+7 more)

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 237 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 241 - "dashboard.measure.js"
Cohesion: 0.43
Nodes (7): captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 242 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 243 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 244 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 245 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 246 - "workScope.service.test.js"
Cohesion: 0.40
Nodes (4): hasEffectivePermission, prismaMock, state, user

## Knowledge Gaps
- **1221 isolated node(s):** `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED`, `TABS`, `ADR-0020` (+1216 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1673 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **114 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0017` connect `permissions.constants.js` to `invoices.service.js`, `seed.demo.js`, `constants.js`?**
  _High betweenness centrality (0.249) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `formatTime.js`, `ImageList.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `WorkScopeContext.jsx`, `client/package.json`, `react`, `withAlpha`, `NotificationSection/index.jsx`, `showError`, `WorkChartsTab.jsx`, `MainLayout/index.jsx`, `AuthenticationRoutes.jsx`, `ContractsPage.jsx`, `AuthForgotPassword.jsx`, `WorksPage.jsx`, `ProviderTypePage.jsx`, `MenuList/index.jsx`, `App.jsx`, `themes/index.jsx`, `useAuth`, `DebouncedInput.jsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `lodash` connect `DebouncedInput.jsx` to `users.service.js`, `server/package.json`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `CONTRACT_TYPES`, `SIMPLE_CAPTURED`, `CONTRACT_CAPTURED` to the rest of the system?**
  _1221 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractReports.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06976744186046512 - nodes in this community are weakly interconnected._