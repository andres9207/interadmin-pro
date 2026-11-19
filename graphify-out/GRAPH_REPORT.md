# Graph Report - WEBPAC-INTERVE  (2026-11-19)

## Corpus Check
- 718 files · ~435,527 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4669 nodes · 13373 edges · 262 communities (146 shown, 116 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 177 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `298aa263`
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
- ContractsPage.jsx
- FundTable.jsx
- auth.routes.js
- statements.service.js
- client/package.json
- PoliciesTab.jsx
- seed.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- users.service.js
- session.service.js
- contractSuspensions.service.test.js
- withAlpha
- dateOnlyText
- invoices.controller.test.js
- writeAudit
- menu-items/index.js
- invoiceGlosses.service.js
- ToastService.js
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
- fMoneyText
- `tbl_contracts`
- StatementReportDialog.jsx
- app.js
- decimal
- invoiceTerms.js
- `tbl_contract_type_fields`
- contractTerms.js
- transaction.mock.js
- scripts
- contractPolicies.service.js
- AuthForgotPassword.jsx
- compilerOptions
- excelJS.js
- statementManagement.routes.js
- permission
- devDependencies
- transaction.service.test.js
- prisma-drift.mjs
- seed.demo.js
- showError
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
- eslint.config.mjs
- error.middleware.js
- getEffectivePermissionIds
- `tbl_providers`
- GeneralDashboard.jsx
- WorkContracts.jsx
- auth.service.js
- handleFirebase.js
- useConfig.js
- `tbl_providers`
- WorkSummaryTab.jsx
- ci-summary.mjs
- httpError
- providerTypeFields.service.js
- money.utils.js
- contracts.controller.test.js
- advanceFilters.js
- `tbl_work_stages`
- `tbl_contracts`
- `tbl_reasons`
- fundFigures.js
- `tbl_user_permissions`
- statements.routes.js
- mailerService.js
- health.service.js
- NotificationSection/index.jsx
- importCase.guard.test.js
- images.js
- `tbl_contract_concepts`
- `tbl_reasons`
- expirationNotice.service.js
- `tbl_users`
- balanceReconciliation.service.test.js
- addressTypes.service.js
- winston.config.js
- works.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- contractSummaryReport.test.js
- workDashboard.utils.js
- showSuccess
- MenuList/index.jsx
- simpleInvoiceTerms.js
- themes/index.jsx
- contractNotifications.service.test.js
- WorksPage.jsx
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
- requestedDetailChanges
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
- invoiceFollowUps.service.test.js
- app.service.test.js
- `tbl_invoices`
- workDashboard.service.test.js
- useMenuCollapse.js
- DebouncedInput.jsx
- auth.service.test.js
- dashboard.service.test.js
- master.service.test.js
- serviceWorker.jsx
- users.service.test.js
- extends
- `tbl_invoice_status_history`
- expirationNotice.service.test.js
- volta
- EasyCrop.jsx

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
- `WorkView()` --indirect_call--> `previewWorkEndDateAPI()`  [INFERRED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/api/requests/worksApi.js
- `WorkView()` --calls--> `EditableList()`  [EXTRACTED]
  client/src/views/work/works/WorkDetailPage.jsx → client/src/ui-component/extended/EditableList.jsx
- `policiesOf()` --indirect_call--> `policyValuesOf()`  [INFERRED]
  server/src/modules/work/contracts/contracts.service.js → server/src/modules/work/contracts/contractPolicies.service.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (262 total, 116 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractReports.service.js"
Cohesion: 0.07
Nodes (44): findExportRows(), renderExport(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, contractInvoicesForReport(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields() (+36 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (37): canViewAllWorks(), contactsRules(), emailRule(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController (+29 more)

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
Cohesion: 0.06
Nodes (44): exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, client_src_hooks_useinvoicemenus_usecanviewinvoices, client_src_hooks_useinvoicemenus_useinvoicemenu, LinkedFilterNotice(), TooltipLongText() (+36 more)

### Community 8 - "workScopeOf"
Cohesion: 0.05
Nodes (87): workScopeOf(), server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController, deleteInvoiceFollowUpController (+79 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.06
Nodes (59): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, ADR-0017 (+51 more)

### Community 10 - "ContractsPage.jsx"
Cohesion: 0.04
Nodes (80): getConstructionCompaniesSelectAPI, contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI() (+72 more)

### Community 11 - "FundTable.jsx"
Cohesion: 0.19
Nodes (21): cellInput, dateOf(), FundTable(), glossItems(), HEADERS, InvoicesButton(), isAct(), missingOf() (+13 more)

### Community 12 - "auth.routes.js"
Cohesion: 0.09
Nodes (29): THEME_MODES, forgotPasswordController(), getSettlementController(), getWindowsByProfileController(), loginController(), logoutAudit(), logoutController(), refreshController() (+21 more)

### Community 13 - "statements.service.js"
Cohesion: 0.07
Nodes (63): renderDocument(), containsFilter(), dateRangeFilter(), filtersWhere(), idFilter(), GLOSS_FIELD_NAMES, statementGlosses(), statementsWithGlosses() (+55 more)

### Community 14 - "client/package.json"
Cohesion: 0.07
Nodes (27): browserslist, development, production, axios, eslint, @eslint/js, eslint-plugin-sonarjs, moment (+19 more)

### Community 15 - "PoliciesTab.jsx"
Cohesion: 0.07
Nodes (34): contractPoliciesApi, getInsurersSelectAPI, configurePolicyTypeBaseAPI(), getPolicyTypesSelectAPI, ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS (+26 more)

### Community 16 - "seed.js"
Cohesion: 0.11
Nodes (17): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+9 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.11
Nodes (48): ADR-0011, moneyText(), sumMoney(), getRuleValues(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf() (+40 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.05
Nodes (35): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+27 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.07
Nodes (33): ADR-0012, ADR-0016, ADR-0018, ADR-0019, ADR-0011, ADR-0017, ADR-0020, ADR-0024 (+25 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.06
Nodes (58): ADR-0021, ADR-0023, server_src_modules_billing_invoices_invoicemenus_simple_type_where, admittedContractsWhere(), admittedTypes(), amountRange(), CONTRACT_GATED_ACTIONS, CONTRACT_SNAPSHOT_KEYS (+50 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.10
Nodes (39): server_src_common_utils_money_utils_percentfor, percentOf(), percentText(), toPercent(), assertContractTotal(), blank(), composeContractInvoice(), composeWith() (+31 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "users.service.js"
Cohesion: 0.04
Nodes (72): ADR-0004, INACTIVE_STATUS, canonical(), EXCLUDED_FROM_FINGERPRINT, findReplay(), idempotencyMisuse(), keyReused(), requestFingerprint() (+64 more)

### Community 25 - "session.service.js"
Cohesion: 0.11
Nodes (28): ADR-0001, jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), setIO(), ACCESS_COOKIE_NAME (+20 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (27): CONTRACT_FIELDS_CATALOG, KEY_TO_ID, typeFieldRows(), ctx, prismaMock, state, ctx, ADR-0016 (+19 more)

### Community 27 - "withAlpha"
Cohesion: 0.17
Nodes (15): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), buildPalette(), RootStyle (+7 more)

### Community 28 - "dateOnlyText"
Cohesion: 0.07
Nodes (58): scopeWhere(), dateOnlyText(), todayDateOnly(), policyExpiringDays(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock() (+50 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "writeAudit"
Cohesion: 0.07
Nodes (55): AUDIT_ENTITIES, AUDIT_OPERATIONS, auditMisuse(), buildRows(), ADR-0013, ADR-0027, newOperationId(), protect() (+47 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "invoiceGlosses.service.js"
Cohesion: 0.13
Nodes (35): glossFieldFor(), assertReleaser(), auditable(), findLockedOpenGloss(), httpError(), ADR-0027, RELEASE_AUDITED, writeGlossRelease() (+27 more)

### Community 33 - "ToastService.js"
Cohesion: 0.05
Nodes (56): deleteFileByPath(), uploadFile(), getStatusesByScopeAPI(), getBusinessRulesAPI(), saveBusinessRulesAPI(), deleteDocApi(), paginationDocsApi(), saveDocApi() (+48 more)

### Community 34 - "statementManagement.service.js"
Cohesion: 0.08
Nodes (67): assertInScope(), statementsGlosses(), workStatementInvoices(), isAct(), actAmortization(), assertCoversPayment(), assertExtractHasInvoices(), assertFundExists() (+59 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.13
Nodes (35): useSchemePalette(), glossRows(), CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), DonutBreakdown() (+27 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (77): auditContext(), moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS, ACT_FIELDS (+69 more)

### Community 39 - "cron/index.js"
Cohesion: 0.13
Nodes (15): ref_http, node-cron, app, server, verifyStatusCatalog(), cronJobs, ADR-0017, registeredTasks (+7 more)

### Community 40 - "works.service.js"
Cohesion: 0.08
Nodes (53): ADR-0007, diffFields(), applyManagers(), applyStages(), assertCollectionPermissions(), assertCollections(), assertGranted(), assertHeader() (+45 more)

### Community 41 - "validation.utils.js"
Cohesion: 0.05
Nodes (58): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, verifyToken(), requirePermission(), validate(), hasEffectivePermission(), revokeSession() (+50 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "@mui/material"
Cohesion: 0.05
Nodes (61): getAddressTypesSelectAPI, getWorkDashboardAPI(), appDrawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, ACTION_TONES, ActionButton() (+53 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.15
Nodes (22): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), Footer(), Header(), ThemeModeSection(), MainLayout() (+14 more)

### Community 46 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+11 more)

### Community 48 - "fMoneyText"
Cohesion: 0.11
Nodes (30): deleteFundAPI(), deleteFundMovementAPI(), exportScopeReportAPI(), getManagementAPI(), getScopeReportAPI(), saveFundAPI(), saveFundMovementAPI(), MoneyField() (+22 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.18
Nodes (8): `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contract_types`, `tbl_providers`

### Community 50 - "StatementReportDialog.jsx"
Cohesion: 0.14
Nodes (21): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), download(), downloadExport(), errorMessage(), EXPORT_FORMATS, ExportButton() (+13 more)

### Community 51 - "app.js"
Cohesion: 0.11
Nodes (15): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, allowedHosts (+7 more)

### Community 52 - "decimal"
Cohesion: 0.10
Nodes (42): decimal(), ratioPercent(), ratioText(), roundMoney(), roundRatio(), pendingAdvances(), advanceBalances(), appliedPct() (+34 more)

### Community 53 - "invoiceTerms.js"
Cohesion: 0.12
Nodes (24): assertTransition(), cancelTransitionFor(), GLOSS_FILTER_NAMES, GLOSS_FILTERS, glossWhere(), hasContract(), historyRow(), httpError() (+16 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contractTerms.js"
Cohesion: 0.06
Nodes (54): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), addTerm(), daysInMonth(), PROGRESS_CRITICAL, PROGRESS_WARNING (+46 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.05
Nodes (32): lockedIdsOf(), transactionRawMocks(), ADR-0009, prismaMock, ctx, prismaMock, state, ADR-0004 (+24 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "contractPolicies.service.js"
Cohesion: 0.08
Nodes (44): insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), conceptLabel(), contractInvoices() (+36 more)

### Community 59 - "AuthForgotPassword.jsx"
Cohesion: 0.06
Nodes (42): forgotPasswordAPI(), loginAPI(), logoutAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), verifyTokenAPI(), client_src_assets_images_interadminpro (+34 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "statementManagement.routes.js"
Cohesion: 0.09
Nodes (30): sendExport(), handleExport(), FUND_MOVEMENT_TYPES, deleteFundController, deleteFundMovementController, exportScopeReportController, getManagementController, getScopeReportController (+22 more)

### Community 64 - "permission"
Cohesion: 0.33
Nodes (5): permission, bash, edit, write, $schema

### Community 65 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-sonarjs, globals, jest, nodemon, pm2 (+2 more)

### Community 66 - "transaction.service.test.js"
Cohesion: 0.08
Nodes (24): ref_fs, ref_path, ref_url, citations, DECISIONS, files(), ROOT, SELF (+16 more)

### Community 68 - "prisma-drift.mjs"
Cohesion: 0.18
Nodes (11): columnList(), database, dbForeignKeys, equivalent, isNoise(), prisma, real, rows (+3 more)

### Community 70 - "seed.demo.js"
Cohesion: 0.06
Nodes (42): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+34 more)

### Community 71 - "showError"
Cohesion: 0.06
Nodes (56): cancelContractAPI(), suspendContractAPI(), invoiceTransitionsApi, getReasonsSelectAPI(), refreshSession(), App(), ThemedToastContainer(), AuthContext (+48 more)

### Community 88 - "status.constants.js"
Cohesion: 0.07
Nodes (44): @prisma/client, adapter, describeTarget(), prisma, testConnection(), ACTIVE_STATUS, DELETED_STATUS, STATUS_IDS (+36 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.03
Nodes (103): addressTypesApi, constructionCompaniesApi, contractTypesApi, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI(), deleteProfileAPI(), paginationProfilesAPI() (+95 more)

### Community 100 - "works.routes.js"
Cohesion: 0.08
Nodes (34): managedWhere(), resolveWorkScope(), selectMyWorks(), changeWorkStateController, changeWorkStatusController, deleteWorkController, exportWorksController, getWorkController (+26 more)

### Community 104 - "`tbl_provider_types`"
Cohesion: 0.22
Nodes (8): `tbl_providers`, `tbl_provider_classifications`, `tbl_provider_type_field_versions`, `tbl_provider_type_fields`, `tbl_work_provider_types`, `tbl_contract_fields`, `tbl_provider_types`, `tbl_work_providers`

### Community 105 - "app.routes.js"
Cohesion: 0.23
Nodes (10): STATUS_KEYS, getMenuController(), getProfilesController(), getStatusesByScope(), getUserPermissionsController(), verifyTokenController(), appRoutes, ADR-0001 (+2 more)

### Community 108 - "statements.service.test.js"
Cohesion: 0.17
Nodes (7): ctx, OTHER, OWN, prismaMock, state, statementInvoices, statementsInvoices

### Community 112 - "notifications.service.js"
Cohesion: 0.25
Nodes (12): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), getNotificationCount(), listNotifications(), markAllAsRead(), markAsRead() (+4 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "ContractDetailPage.jsx"
Cohesion: 0.07
Nodes (67): exportContractAPI(), SubCard(), ContactsList(), ADR-0009, DataList(), Figure(), Pending(), SummaryAside() (+59 more)

### Community 117 - "export.service.js"
Cohesion: 0.09
Nodes (45): pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument(), buildPdf() (+37 more)

### Community 118 - "eslint.config.mjs"
Cohesion: 0.12
Nodes (18): asWarnings(), compat, __dirname, __filename, isOff(), @eslint/compat, @eslint/eslintrc, ref_eslint_js (+10 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "getEffectivePermissionIds"
Cohesion: 0.07
Nodes (27): express, supertest, getEffectivePermissionIds(), nitField(), constructionCompaniesRoutes, constructionCompaniesConfig, constructionCompaniesService, ADR-0004 (+19 more)

### Community 123 - "GeneralDashboard.jsx"
Cohesion: 0.13
Nodes (24): getDashboardSummaryAPI(), ADR-0002, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_useinvoicemenus, MainCard(), AlertsCard(), Empty(), LatestInvoicesCard() (+16 more)

### Community 124 - "WorkContracts.jsx"
Cohesion: 0.16
Nodes (28): AlertChips(), contractAlertOptions(), fPercentText(), ADVANCE_LEVELS, AdvanceBar(), AdvanceFilter(), AdvanceLegend(), matchesAdvanceFilter() (+20 more)

### Community 125 - "auth.service.js"
Cohesion: 0.07
Nodes (38): bcrypt, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+30 more)

### Community 129 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 130 - "useConfig.js"
Cohesion: 0.20
Nodes (11): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ElevationScroll(), HorizontalBar(), ImageList() (+3 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (11): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+3 more)

### Community 132 - "WorkSummaryTab.jsx"
Cohesion: 0.13
Nodes (30): contractRows(), daysOpenText(), followUpRows(), followUpsDrill(), invoiceRows(), CardTitle(), clickableChartSx, DonutWithLegend() (+22 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "httpError"
Cohesion: 0.13
Nodes (34): approveInvoice(), assertContractAdmitsCancel(), assertInvoiceVisible(), assertNoReleasedGlossLinks(), assertReleasesNoGlosses(), assertStage(), assertUniqueNumber(), assertWork() (+26 more)

### Community 136 - "providerTypeFields.service.js"
Cohesion: 0.11
Nodes (29): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+21 more)

### Community 137 - "money.utils.js"
Cohesion: 0.09
Nodes (23): ref_node_fs, HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, toMoney() (+15 more)

### Community 140 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 142 - "advanceFilters.js"
Cohesion: 0.10
Nodes (21): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, invoiceAdvanceWhere(), isAdvance (+13 more)

### Community 151 - "fundFigures.js"
Cohesion: 0.16
Nodes (18): actValueOf(), amortizationOf(), byDate(), fiduciaryOf(), FUND_MOVEMENT_TYPE_LETTERS, FUND_MOVEMENT_TYPE_NAMES, fundFigures(), fundFiguresText() (+10 more)

### Community 153 - "statements.routes.js"
Cohesion: 0.11
Nodes (28): STATEMENT_GLOSS_FILTERS, STATEMENT_VOUCHER_FILTERS, changeStatementStatusController, deleteStatementController, exportStatementController, exportStatementGroupController, getStatementController, getStatementGroupReportController (+20 more)

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
Cohesion: 0.29
Nodes (6): imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "expirationNotice.service.js"
Cohesion: 0.19
Nodes (19): contractAlertWheres(), CLOSED_STATES, CONTRACT_ALERTS, POLICY_ALERTS, addDays(), alreadyNotified(), buildNotices(), contractsWithExpiredPoliciesWhere() (+11 more)

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

### Community 183 - "works.service.test.js"
Cohesion: 0.17
Nodes (9): ALL, ctx, existingWork, ADR-0011, NONE, OTHER, OWN, prismaMock (+1 more)

### Community 190 - "invariants.check.js"
Cohesion: 0.21
Nodes (9): CHECKS, cloneSql(), columnsCache, errorText(), insertableColumns(), LABELS, ROLLBACK, runCheck() (+1 more)

### Community 191 - "authjwt.middleware.test.js"
Cohesion: 0.40
Nodes (4): buildRes(), mockFindFirst, runMiddleware(), validPayload

### Community 193 - "contractSummaryReport.test.js"
Cohesion: 0.11
Nodes (12): exceljs, COLUMNS, ROWS, concept(), contract(), prismaMock, contract, contractBalances (+4 more)

### Community 194 - "workDashboard.utils.js"
Cohesion: 0.18
Nodes (10): CONTRACT_STATE_CHART_COLORS, DASHBOARD_PATH, GLOSS_CHART_COLORS, INVOICE_TYPE_COLORS, MENU_CHART_COLORS, menuColor(), MONTH_NAMES, monthLabel() (+2 more)

### Community 197 - "showSuccess"
Cohesion: 0.08
Nodes (42): getIdentityDocumentsSelectAPI, checkProviderIdentificationAPI(), exportProvidersAPI(), getAssignableWorksAPI(), getProvidersSelectAPI(), ADR-0012, providersApi, workProvidersApi (+34 more)

### Community 198 - "MenuList/index.jsx"
Cohesion: 0.31
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 199 - "simpleInvoiceTerms.js"
Cohesion: 0.19
Nodes (13): previewSimpleInvoice(), blank(), FORMULAS, hasSimpleAmounts(), httpError(), ADR-0023, ADR-0026, SIMPLE_FIELDS (+5 more)

### Community 201 - "themes/index.jsx"
Cohesion: 0.27
Nodes (7): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), Typography()

### Community 202 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 203 - "WorksPage.jsx"
Cohesion: 0.05
Nodes (53): getDashboardDetailAPI(), exportWorksAPI(), getMyWorksSelectAPI(), getWorkFilterManagersAPI(), getWorkFilterProvidersAPI(), getWorkManagersSelectAPI(), getWorksSummaryAPI(), previewWorkEndDateAPI() (+45 more)

### Community 204 - "session.service.test.js"
Cohesion: 0.20
Nodes (6): ref_crypto, dbUser, mockDisconnectSockets, mockIn, prismaMock, user

### Community 206 - "getIO"
Cohesion: 0.14
Nodes (14): getIO(), IDEMPOTENCY_HEADER, FIELD_ATTRIBUTES, getProviderTypeFieldsController, pickField(), saveProviderTypeFieldsController, deleteModuleDoc(), paginationModuleDocs() (+6 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.04
Nodes (24): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, prismaMock, payload, hasEffectivePermission (+16 more)

### Community 212 - "contracts.service.js"
Cohesion: 0.07
Nodes (51): ADR-0006, contractsWithPendingAdvanceWhere(), server_src_modules_billing_invoices_invoicemenus_issimplemode, getInvoiceFormOptions(), advanceWhereOf(), assertContractType(), assertHeader(), assertProviderAssigned() (+43 more)

### Community 217 - "src/index.jsx"
Cohesion: 0.20
Nodes (9): client_src_assets_scss_style, container, root, reportWebVitals(), @fontsource/inter, @fontsource/poppins, @fontsource/roboto, react-dom (+1 more)

### Community 218 - "`tbl_statements`"
Cohesion: 0.18
Nodes (9): `tbl_invoices`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_statements`, `tbl_invoices`, `tbl_status`, `tbl_users` (+1 more)

### Community 219 - "statementManagement.service.test.js"
Cohesion: 0.18
Nodes (7): actInput(), ctx, OTHER, OWN, paymentInput(), prismaMock, state

### Community 220 - "invoiceGlosses.service.test.js"
Cohesion: 0.13
Nodes (8): assertContractInScope, assertInvoiceVisible, ctx, getInvoice, prismaMock, SCOPE, state, VALUE_LINE

### Community 221 - "requestedDetailChanges"
Cohesion: 0.22
Nodes (11): isBillingType(), approvalSnapshot(), detailText(), hasDetail(), isSimpleType(), requestedDetailChanges(), simpleSnapshot(), SNAPSHOT_AMOUNTS (+3 more)

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "contractConcepts.service.js"
Cohesion: 0.10
Nodes (57): withContractAiu(), REASON_SCOPES, assertContractStillAdmits(), CANCEL_TARGET, cancelContract(), ADR-0027, text(), activeSequence() (+49 more)

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
Cohesion: 0.43
Nodes (7): captured, explain(), main(), measure(), parseParams(), percentile(), plain()

### Community 242 - "dashboardDetail.service.test.js"
Cohesion: 0.25
Nodes (4): ALL, EVERYTHING, OWN, prismaMock

### Community 243 - "invoiceFollowUps.service.test.js"
Cohesion: 0.20
Nodes (6): assertInvoiceVisible, ctx, prismaMock, SCOPE, state, today

### Community 244 - "app.service.test.js"
Cohesion: 0.22
Nodes (6): BILLING, CONTRACTS, DASHBOARD, HOME, prismaMock, state

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

### Community 253 - "serviceWorker.jsx"
Cohesion: 0.60
Nodes (5): checkValidServiceWorker(), isLocalhost, register(), registerValidSW(), unregister()

### Community 254 - "users.service.test.js"
Cohesion: 0.33
Nodes (4): baseUser, ctx, editPayload, prismaMock

### Community 255 - "extends"
Cohesion: 0.50
Nodes (4): eslintConfig, extends, react-app, react-app/jest

### Community 257 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

### Community 259 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 260 - "volta"
Cohesion: 0.67
Nodes (3): volta, node, yarn

## Knowledge Gaps
- **1264 isolated node(s):** `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES`, `TERM_UNIT_NAMES`, `ADR-0017` (+1259 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1725 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **116 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0012` connect `permissions.constants.js` to `ContractDetailPage.jsx`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Why does `ADR-0019` connect `permissions.constants.js` to `constants.js`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig.js`, `WorkSummaryTab.jsx`, `EasyCrop.jsx`, `constants.js`, `InvoiceFormPage.jsx`, `ContractsPage.jsx`, `FundTable.jsx`, `client/package.json`, `PoliciesTab.jsx`, `withAlpha`, `NotificationSection/index.jsx`, `ToastService.js`, `WorkChartsTab.jsx`, `MainLayout/index.jsx`, `fMoneyText`, `StatementReportDialog.jsx`, `AuthForgotPassword.jsx`, `showSuccess`, `MenuList/index.jsx`, `showError`, `themes/index.jsx`, `WorksPage.jsx`, `useAuth`, `ContractDetailPage.jsx`, `DebouncedInput.jsx`, `GeneralDashboard.jsx`, `WorkContracts.jsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `STATUS_TABS`, `CONTRACT_ALERT_OPTIONS`, `CONTRACT_INVOICE_TYPES` to the rest of the system?**
  _1264 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractReports.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06868686868686869 - nodes in this community are weakly interconnected._