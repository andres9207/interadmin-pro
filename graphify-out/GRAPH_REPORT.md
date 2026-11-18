# Graph Report - WEBPAC-INTERVE  (2026-11-18)

## Corpus Check
- 718 files · ~434,997 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4666 nodes · 13370 edges · 259 communities (144 shown, 115 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 177 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7fff9967`
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
- StatementManagementPage.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- ProfilePage.jsx
- expirationNotice.service.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- moneyText
- `tbl_users`
- status.constants.js
- socket.js
- contractSuspensions.service.test.js
- withAlpha
- dashboard.service.js
- invoices.controller.test.js
- withLockedTransaction
- menu-items/index.js
- invoiceGlosses.service.js
- showError
- statementManagement.service.js
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
- StatementReportDialog.jsx
- app.js
- decimal
- invoiceTerms.js
- `tbl_contract_type_fields`
- dateOnlyText
- transaction.mock.js
- scripts
- policyTerms.js
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- statementManagement.routes.js
- permission
- devDependencies
- transaction.service.test.js
- prisma-drift.mjs
- seed.demo.js
- App.jsx
- `tbl_contract_status_history`
- getEffectivePermissionIds
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- express
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- fMoneyText
- export.service.js
- eslint.config.js
- error.middleware.js
- users.service.js
- `tbl_providers`
- GeneralDashboard.jsx
- WorkContracts.jsx
- writeAudit
- DocumentManagement.jsx
- useConfig.js
- `tbl_providers`
- WorkSummaryTab.jsx
- ci-summary.mjs
- invoiceEvidence.service.test.js
- ForgotPassword.jsx
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
- works.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractPolicies.service.test.js
- workDashboard.utils.js
- NewProviderDialog.jsx
- MenuList/index.jsx
- decisionReferences.guard.test.js
- themes/index.jsx
- contractNotifications.service.test.js
- useSummaryDrill.jsx
- session.service.test.js
- getIO
- ref_jest_globals
- contracts.service.js
- `tbl_invoices`
- `tbl_invoices`
- src/index.jsx
- `tbl_statements`
- statementManagement.service.test.js
- invoiceGlosses.service.test.js
- Sidebar/index.jsx
- uniqueConstraints.constants.test.js
- contractConcepts.service.js
- error.middleware.test.js
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
- WorkCosts.jsx
- `tbl_invoices`
- workDashboard.service.test.js
- useMenuCollapse.js
- DebouncedInput.jsx
- auth.service.test.js
- dashboard.service.test.js
- master.service.test.js
- policyTypes.service.test.js
- status.service.test.js
- extends
- `tbl_invoice_status_history`

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 159 edges
2. `react` - 124 edges
3. `showError()` - 112 edges
4. `moneyText()` - 105 edges
5. `workScopeOf()` - 102 edges
6. `dateOnlyText()` - 95 edges
7. `writeAudit()` - 88 edges
8. `withLockedTransaction()` - 84 edges
9. `useAuth()` - 81 edges
10. `fMoneyText()` - 80 edges

## Surprising Connections (you probably didn't know these)
- `deleteModuleDoc()` --calls--> `withLockedTransaction()`  [EXTRACTED]
  server/src/modules/app/documents/document.service.js → server/src/common/services/transaction.service.js
- `moneySum()` --indirect_call--> `decimal()`  [INFERRED]
  server/src/modules/billing/statementManagement/statementManagement.service.js → server/src/common/utils/money.utils.js
- `PrivateRoute()` --calls--> `useAuth()`  [EXTRACTED]
  client/src/routes/PrivateRoute.jsx → client/src/contexts/AuthContext.jsx
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (259 total, 115 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DateTimePickerToolbar() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractReports.service.js"
Cohesion: 0.08
Nodes (37): findExportRows(), getRuleValues(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, ADVANCE_COLUMNS, advanceTotals(), authored(), CONCEPT_COLUMNS, CONTRACT_COLUMNS (+29 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (33): ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController, getProviderController, INPUT_FIELDS (+25 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (40): @azure/identity, cross-env, dayjs, excel4node, fs-extra, generic-pool, isomorphic-fetch, jest (+32 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (71): applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes(), assertTypeIds() (+63 more)

### Community 7 - "constants.js"
Cohesion: 0.03
Nodes (89): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractMenuAPI(), ADR-0006 (+81 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (89): workScopeOf(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+81 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (61): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoicesApi, ADR-0017 (+53 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.09
Nodes (40): getContractFieldsAPI(), getContractFormOptionsAPI(), getContractWorksSelectAPI(), previewContractConceptAPI(), previewContractEndDateAPI(), useEndDatePreview(), ConceptDialog(), ECONOMIC_INPUTS (+32 more)

### Community 11 - "StatementManagementPage.jsx"
Cohesion: 0.06
Nodes (54): deleteFundAPI(), deleteFundMovementAPI(), exportScopeReportAPI(), getManagementAPI(), getScopeReportAPI(), getMyWorksSelectAPI(), instance, NO_REFRESH_URLS (+46 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.07
Nodes (67): containsFilter(), countByStatus(), dateRangeFilter(), DEFAULT_ROWS, filtersWhere(), idFilter(), MAX_ROWS, paginate() (+59 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (44): asWarnings(), compat, __dirname, __filename, isOff(), browserslist, development, production (+36 more)

### Community 15 - "ProfilePage.jsx"
Cohesion: 0.16
Nodes (20): deleteProfileAPI(), paginationProfilesAPI(), deleteUserAPI(), paginationUsersAPI(), filterParams(), isEmptyValue(), NO_FILTERS, useListFilters() (+12 more)

### Community 16 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (43): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+35 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.08
Nodes (48): ADR-0011, sumMoney(), ADVANCE_LEVELS, advanceLevel(), alertsOf(), byProviderTypeBlock(), byUrgency(), conceptLabel() (+40 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.08
Nodes (22): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, ADR-0020, ADR-0024 (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.05
Nodes (48): ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0011, ADR-0017, ADR-0020, ADR-0024 (+40 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (104): ADR-0021, ADR-0023, invoiceAdvanceWhere(), matchesContractAdvance(), billingBalances(), isBillingType(), server_src_modules_billing_invoices_invoicemenus_issimplemode, server_src_modules_billing_invoices_invoicemenus_simple_type_where (+96 more)

### Community 22 - "moneyText"
Cohesion: 0.06
Nodes (70): isBlank(), moneyText(), server_src_common_utils_money_utils_percentfor, percentOf(), percentText(), toMoney(), toPercent(), advanceBar() (+62 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "status.constants.js"
Cohesion: 0.05
Nodes (58): adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, INACTIVE_STATUS, AUDIT_OPERATIONS (+50 more)

### Community 25 - "socket.js"
Cohesion: 0.26
Nodes (9): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), setIO() (+1 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.04
Nodes (32): CONFIGURABLE_FIELDS, CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx (+24 more)

### Community 27 - "withAlpha"
Cohesion: 0.19
Nodes (14): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), RootStyle, SimpleBarScroll() (+6 more)

### Community 28 - "dashboard.service.js"
Cohesion: 0.08
Nodes (40): scopeWhere(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002 (+32 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "withLockedTransaction"
Cohesion: 0.13
Nodes (34): withLockedTransaction(), USER_NAME_SELECT, userFullName(), AUDIT_SELECT, getInvoiceEvidence(), groupOperations(), httpError(), isApproval() (+26 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.09
Nodes (16): admin, icons, billing, dashboard, icons, menuItems, icons, other (+8 more)

### Community 32 - "invoiceGlosses.service.js"
Cohesion: 0.11
Nodes (43): AUDIT_ENTITIES, GLOSS_FIELD_NAMES, assertReleaser(), auditable(), findLockedOpenGloss(), httpError(), ADR-0027, RELEASE_AUDITED (+35 more)

### Community 33 - "showError"
Cohesion: 0.05
Nodes (93): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), contractPoliciesApi, suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, configurePolicyTypeBaseAPI() (+85 more)

### Community 34 - "statementManagement.service.js"
Cohesion: 0.06
Nodes (83): workStatementInvoices(), actValueOf(), amortizationOf(), byDate(), fiduciaryOf(), FUND_MOVEMENT_TYPE_LETTERS, FUND_MOVEMENT_TYPE_NAMES, FUND_MOVEMENT_TYPES (+75 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.13
Nodes (37): useSchemePalette(), invoiceRows(), advanceDrill(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf() (+29 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (80): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), getContractMenu(), CONTRACT_REPORTS (+72 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, STATUS_IDS, verifyStatusCatalog(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "works.service.js"
Cohesion: 0.07
Nodes (70): ADR-0007, diffFields(), assertInScope(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING, progressLevel() (+62 more)

### Community 41 - "validation.utils.js"
Cohesion: 0.09
Nodes (28): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), idArray(), idempotencyKeyRule() (+20 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "@mui/material"
Cohesion: 0.05
Nodes (60): getAddressTypesSelectAPI, getWorksSummaryAPI(), WorkSection(), gridSpacing, CardSecondaryAction(), ACTION_TONES, ActionButton(), toneOf() (+52 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.26
Nodes (13): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Footer(), Header(), ThemeModeSection(), MainLayout() (+5 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "AuthenticationRoutes.jsx"
Cohesion: 0.19
Nodes (10): MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError(), router, MainRoutes (+2 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.18
Nodes (8): `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contract_types`, `tbl_providers`

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.14
Nodes (21): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton() (+13 more)

### Community 51 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 52 - "decimal"
Cohesion: 0.08
Nodes (48): @prisma/client, decimal(), HUNDRED, MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ratioPercent(), ratioText() (+40 more)

### Community 53 - "invoiceTerms.js"
Cohesion: 0.11
Nodes (23): cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, glossWhere(), httpError(), INVOICE_ALERT_NAMES, INVOICE_ALERTS, INVOICE_TRANSITIONS (+15 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "dateOnlyText"
Cohesion: 0.08
Nodes (48): dateOnlyText(), toDateOnly(), daysBetween(), discrepancyLine(), findEndDateDiscrepancies(), ADR-0015, runEndDateReconciliation(), derivedEndDate() (+40 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (34): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+26 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "policyTerms.js"
Cohesion: 0.08
Nodes (46): insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), policiesBlock(), conceptLabel() (+38 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.17
Nodes (17): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), DatePicker(), AnimateButton(), CustomFormControl, hasMixed() (+9 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "statementManagement.routes.js"
Cohesion: 0.09
Nodes (31): sendExport(), IDEMPOTENCY_HEADER, exportFormatRule(), handleExport(), deleteFundController, deleteFundMovementController, exportScopeReportController, getManagementController (+23 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "transaction.service.test.js"
Cohesion: 0.12
Nodes (14): ref_fs, ref_url, ALLOWED, files(), lines, SRC, ADR-0027, loggerMock (+6 more)

### Community 68 - "prisma-drift.mjs"
Cohesion: 0.18
Nodes (11): columnList(), database, dbForeignKeys, equivalent, isNoise(), prisma, real, rows (+3 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.06
Nodes (52): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+44 more)

### Community 71 - "App.jsx"
Cohesion: 0.19
Nodes (12): loginAPI(), logoutAPI(), verifyTokenAPI(), App(), ThemedToastContainer(), AuthContext, AuthProvider(), getStoredUser() (+4 more)

### Community 88 - "getEffectivePermissionIds"
Cohesion: 0.06
Nodes (35): getEffectivePermissionIds(), assertModeUnchangedInUse(), httpError(), ADR-0010, providerTypesConfig, providerTypesService, getDashboardDetailController, getDashboardSummaryController (+27 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (109): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI() (+101 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.07
Nodes (42): ALL, assertAnyInScope(), canViewAllWorks(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf() (+34 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "express"
Cohesion: 0.11
Nodes (18): express, supertest, STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController() (+10 more)

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

### Community 116 - "fMoneyText"
Cohesion: 0.04
Nodes (105): getStatusesByScopeAPI(), exportContractAPI(), invoiceGlossesApi, changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), worksApi, useSocket() (+97 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (58): exceljs, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+50 more)

### Community 118 - "eslint.config.js"
Cohesion: 0.40
Nodes (5): ref_eslint_js, ref_eslint_plugin_sonarjs, globals, asWarnings(), isOff()

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "users.service.js"
Cohesion: 0.09
Nodes (27): ADR-0004, DIAN_WEIGHTS, formatFor(), GENERIC_FORMAT, IDENTIFICATION_FORMATS, identificationError(), ADR-0008, identityDocumentsRoutes (+19 more)

### Community 123 - "GeneralDashboard.jsx"
Cohesion: 0.15
Nodes (22): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, headerStyle, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard(), num (+14 more)

### Community 124 - "WorkContracts.jsx"
Cohesion: 0.18
Nodes (25): AlertChips(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter(), matchesAdvanceLegend() (+17 more)

### Community 125 - "writeAudit"
Cohesion: 0.05
Nodes (68): ADR-0001, bcrypt, ref_crypto, auditMisuse(), buildRows(), ADR-0013, ADR-0027, protect() (+60 more)

### Community 129 - "DocumentManagement.jsx"
Cohesion: 0.15
Nodes (17): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), deleteFileByPath(), uploadFile(), deleteDocApi() (+9 more)

### Community 130 - "useConfig.js"
Cohesion: 0.33
Nodes (7): useConfig(), ElevationScroll(), HorizontalBar(), ImageList(), srcset(), getImageUrl(), ImagePath

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (11): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+3 more)

### Community 132 - "WorkSummaryTab.jsx"
Cohesion: 0.20
Nodes (21): contractRows(), daysOpenText(), followUpRows(), followUpsDrill(), glossRows(), num, useDrillDown(), initialsOf() (+13 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "invoiceEvidence.service.test.js"
Cohesion: 0.40
Nodes (3): prismaMock, state, user

### Community 136 - "ForgotPassword.jsx"
Cohesion: 0.19
Nodes (12): client_src_assets_images_interadminpro, LogoSection(), LoginPage, AppBar(), ElevationScroll(), CONTENT, IMAGE, Logo() (+4 more)

### Community 137 - "contractPolicies.service.js"
Cohesion: 0.12
Nodes (38): newOperationId(), ADR-0017, REASON_SCOPES, reasonsService, assertContractStillAdmits(), CANCEL_TARGET, cancelContract(), ADR-0027 (+30 more)

### Community 140 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 142 - "advanceFilters.js"
Cohesion: 0.14
Nodes (15): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024, registered (+7 more)

### Community 151 - "liquidationTerms.js"
Cohesion: 0.14
Nodes (13): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+5 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.11
Nodes (28): STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController (+20 more)

### Community 154 - "mailerService.js"
Cohesion: 0.20
Nodes (10): dotenv, imap-simple, nodemailer, prisma, emailApp, nameApp, nameAppMail, checkEmailBounces() (+2 more)

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
Cohesion: 0.24
Nodes (12): findUsersWithPermission(), saveToSent(), sendEmail(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations() (+4 more)

### Community 176 - "`tbl_users`"
Cohesion: 0.20
Nodes (10): idx_invoices_contract_type_state, `tbl_invoice_advance_details`, `tbl_invoice_liquidation_details`, `tbl_invoice_retention_refund_details`, `tbl_invoice_simple_details`, `tbl_invoice_follow_ups`, `tbl_invoice_gloss_fields`, `tbl_invoice_glosses` (+2 more)

### Community 178 - "balanceReconciliation.service.test.js"
Cohesion: 0.15
Nodes (9): CONCEPTS, contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail (+1 more)

### Community 179 - "addressTypes.contacts.js"
Cohesion: 0.47
Nodes (5): defineContacts(), FIELDS, httpError(), ADR-0009, optionalText()

### Community 181 - "winston.config.js"
Cohesion: 0.29
Nodes (6): moment-timezone, morgan, winston, customFormat, logger, httpLogger

### Community 183 - "works.service.test.js"
Cohesion: 0.15
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

### Community 194 - "workDashboard.utils.js"
Cohesion: 0.15
Nodes (12): CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH, GLOSS_CHART_COLORS, INVOICE_TYPE_COLORS, MANAGER_ROLE_NAMES, MENU_CHART_COLORS, menuColor(), MONTH_NAMES (+4 more)

### Community 197 - "NewProviderDialog.jsx"
Cohesion: 0.08
Nodes (40): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), exportProvidersAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+32 more)

### Community 198 - "MenuList/index.jsx"
Cohesion: 0.22
Nodes (10): getMenuAPI(), genericRequest, getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus() (+2 more)

### Community 199 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 201 - "themes/index.jsx"
Cohesion: 0.22
Nodes (9): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), buildPalette(), defaultColor (+1 more)

### Community 202 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 203 - "useSummaryDrill.jsx"
Cohesion: 0.23
Nodes (10): getDashboardDetailAPI(), getWorkDashboardAPI(), ADR-0002, EMPTY_FILTERS, ROWS_BY_KIND, SEARCH_HINTS, SearchField(), useSummaryDrill() (+2 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.22
Nodes (5): dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "getIO"
Cohesion: 0.08
Nodes (36): getIO(), verifyToken(), requirePermission(), validate(), hasEffectivePermission(), isSessionActive(), createMasterControllers(), createMasterRouter() (+28 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (21): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+13 more)

### Community 212 - "contracts.service.js"
Cohesion: 0.07
Nodes (48): ADR-0006, typeAppliesAiu(), contractsWithPendingAdvanceWhere(), POLICY_STATUS_SELECT, advanceWhereOf(), assertContractType(), assertHeader(), assertProviderAssigned() (+40 more)

### Community 217 - "src/index.jsx"
Cohesion: 0.12
Nodes (18): client_src_assets_scss_style, config, ConfigContext, ConfigProvider(), useLocalStorage(), container, root, reportWebVitals() (+10 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "statementManagement.service.test.js"
Cohesion: 0.18
Nodes (7): actInput(), ctx, OTHER, OWN, paymentInput(), prismaMock, state

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.13
Nodes (8): assertContractInScope, assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state, VALUE_LINE

### Community 221 - "Sidebar/index.jsx"
Cohesion: 0.33
Nodes (7): MainContentStyled, Sidebar(), closedMixin(), MiniDrawerStyled, openedMixin(), appDrawerWidth, drawerWidth

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "contractConcepts.service.js"
Cohesion: 0.11
Nodes (40): AIU_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank(), ADR-0006 (+32 more)

### Community 226 - "error.middleware.test.js"
Cohesion: 0.33
Nodes (6): status(), REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout(), realUniqueViolation()

### Community 227 - "contractEndDateReconciliation.service.test.js"
Cohesion: 0.22
Nodes (7): contracts, findUsersWithPermission, insertNotification, logger, prismaMock, recipients, sendEmail

### Community 237 - "contractLiquidation.service.test.js"
Cohesion: 0.22
Nodes (6): contractBalances, ctx, ADR-0017, notifyWorkManagers, state, tx

### Community 241 - "dashboard.measure.js"
Cohesion: 0.36
Nodes (8): ref_node_fs, captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 242 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 243 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 244 - "WorkCosts.jsx"
Cohesion: 0.24
Nodes (9): CardTitle(), clickableChartSx, drillLinkSx, INVOICE_NOUN, ADR-0002, MENU_COLORS, menuColor(), num (+1 more)

### Community 245 - "`tbl_invoices`"
Cohesion: 0.27
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_fund_movements`, `tbl_rotating_funds`, `tbl_notifications`, `tbl_work_stages`, `tbl_works`

### Community 246 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 249 - "auth.service.test.js"
Cohesion: 0.22
Nodes (6): activeUser, mockComparePassword, mockHashPassword, mockRevokeSession, mockSendEmail, prismaMock

### Community 251 - "dashboard.service.test.js"
Cohesion: 0.29
Nodes (4): ALL, ADR-0002, OWN, prismaMock

### Community 252 - "master.service.test.js"
Cohesion: 0.33
Nodes (4): baseConfig, config, prismaMock, service

### Community 253 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

### Community 254 - "status.service.test.js"
Cohesion: 0.40
Nodes (3): catalog, expected, prismaMock

### Community 255 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 257 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

## Knowledge Gaps
- **1262 isolated node(s):** `contracts`, `work`, `COLUMNS`, `MONTHS`, `HEADERS` (+1257 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1724 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **115 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `fMoneyText`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `DocumentManagement.jsx`, `useConfig.js`, `WorkSummaryTab.jsx`, `constants.js`, `ForgotPassword.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `StatementManagementPage.jsx`, `client/package.json`, `ProfilePage.jsx`, `withAlpha`, `NotificationSection/index.jsx`, `menu-items/index.js`, `showError`, `WorkChartsTab.jsx`, `MainLayout/index.jsx`, `AuthenticationRoutes.jsx`, `StatementReportDialog.jsx`, `AuthForgotPassword.jsx`, `NewProviderDialog.jsx`, `MenuList/index.jsx`, `App.jsx`, `themes/index.jsx`, `useSummaryDrill.jsx`, `Sidebar/index.jsx`, `useAuth`, `fMoneyText`, `WorkCosts.jsx`, `DebouncedInput.jsx`, `GeneralDashboard.jsx`, `WorkContracts.jsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `contracts`, `work`, `COLUMNS` to the rest of the system?**
  _1262 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractReports.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07539118065433854 - nodes in this community are weakly interconnected._