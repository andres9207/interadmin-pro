# Graph Report - WEBPAC-INTERVE  (2026-11-20)

## Corpus Check
- 722 files · ~441,929 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 6, .template 1, .css 1)

## Summary
- 4736 nodes · 13562 edges · 265 communities (150 shown, 115 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 178 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `df364257`
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
- FundTable.jsx
- auditContext
- statements.service.js
- client/package.json
- PolicyTypePage.jsx
- expirationNotice.service.js
- workDashboard.service.js
- invoices.service.test.js
- compilerOptions
- permissions.constants.js
- invoices.service.js
- contractInvoiceTerms.js
- `tbl_users`
- withLockedTransaction
- session.service.js
- contractSuspensions.service.test.js
- withAlpha
- dashboard.service.js
- invoices.controller.test.js
- audit.service.js
- menu-items/index.js
- invoiceGlosses.service.js
- UserDialog.jsx
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
- fundReportSheet.js
- `tbl_contracts`
- StatementsPage.jsx
- app.js
- decimal
- formatTime.js
- `tbl_contract_type_fields`
- contractTerms.js
- transaction.mock.js
- scripts
- contractPolicies.service.js
- AuthenticationRoutes.jsx
- compilerOptions
- excelJS.js
- statementManagement.routes.js
- permission
- devDependencies
- ref_fs
- prisma-drift.mjs
- seed.demo.js
- showError
- `tbl_contract_status_history`
- getEffectivePermissionIds
- `tbl_status`
- useAuth
- `tbl_permissions`
- workScope.service.js
- `tbl_provider_types`
- app.routes.js
- statements.service.test.js
- notifications.service.js
- `tbl_works`
- `tbl_policies`
- fDateOnly
- export.service.js
- eslint.config.mjs
- error.middleware.js
- health.routes.test.js
- `tbl_providers`
- GeneralDashboard.jsx
- fMoneyText
- auth.service.js
- handleFirebase.js
- useConfig.js
- `tbl_providers`
- WorkSummaryTab.jsx
- ci-summary.mjs
- policyTerms.js
- contractFields.js
- glossFields.js
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
- WorkCosts.jsx
- `tbl_users`
- balanceReconciliation.service.test.js
- addressTypes.service.js
- winston.config.js
- works.service.test.js
- client_src_assets_images_interve
- invariants.check.js
- authjwt.middleware.test.js
- httpError
- workDashboard.utils.js
- effectivePermissions.service.js
- MenuList/index.jsx
- AuthForgotPassword.jsx
- themes/index.jsx
- contractNotifications.service.test.js
- WorksPage.jsx
- liquidationTerms.js
- App.jsx
- ref_jest_globals
- contracts.service.js
- `tbl_invoices`
- `tbl_invoices`
- src/index.jsx
- `tbl_statements`
- statementManagement.service.test.js
- invoiceGlosses.service.test.js
- advanceTerms.js
- uniqueConstraints.constants.test.js
- contractConcepts.service.js
- transaction.service.test.js
- ContactsEditor.jsx
- `tbl_works`
- `tbl_status`
- `tbl_sessions`
- contractLiquidation.service.test.js
- `tbl_users`
- `tbl_work_stages`
- dashboard.measure.js
- dashboardDetail.service.test.js
- invoiceFollowUps.service.test.js
- money.utils.js
- `tbl_invoices`
- workDashboard.service.test.js
- contractPolicies.service.test.js
- DebouncedInput.jsx
- auth.service.test.js
- dashboard.service.test.js
- master.service.test.js
- serviceWorker.jsx
- users.service.test.js
- statementActs.service.test.js
- `tbl_invoice_status_history`
- expirationNotice.service.test.js
- decisionReferences.guard.test.js
- contractCancellation.service.test.js
- movementValues
- policyTypes.service.test.js
- Loadable.jsx

## God Nodes (most connected - your core abstractions)
1. `@mui/material` - 159 edges
2. `react` - 124 edges
3. `showError()` - 112 edges
4. `moneyText()` - 105 edges
5. `workScopeOf()` - 102 edges
6. `dateOnlyText()` - 97 edges
7. `writeAudit()` - 90 edges
8. `withLockedTransaction()` - 86 edges
9. `useAuth()` - 81 edges
10. `fMoneyText()` - 80 edges

## Surprising Connections (you probably didn't know these)
- `moneySum()` --indirect_call--> `decimal()`  [INFERRED]
  server/src/modules/billing/statementManagement/statementManagement.service.js → server/src/common/utils/money.utils.js
- `ContractsPage()` --indirect_call--> `exportContractsAPI()`  [INFERRED]
  client/src/views/work/contracts/ContractsPage.jsx → client/src/api/requests/contractsApi.js
- `money()` --calls--> `moneyText()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `advanceTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js
- `controlTotals()` --calls--> `sumMoney()`  [EXTRACTED]
  server/src/modules/work/contracts/contractReports.service.js → server/src/common/utils/money.utils.js

## Import Cycles
- None detected.

## Communities (265 total, 115 thin omitted)

### Community 0 - "overrides/index.js"
Cohesion: 0.09
Nodes (23): Avatar(), Button(), CardActions(), CardContent(), CardHeader(), Checkbox(), DataGrid(), DatePicker() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, axios, @azure/identity, bcrypt, compression, cookie-parser, cors, cross-env (+37 more)

### Community 2 - "contractReports.service.js"
Cohesion: 0.07
Nodes (47): policyExpiringDays(), getContractPolicies(), ADVANCE_COLUMNS, advanceTotals(), authored(), balanceFields(), CONCEPT_COLUMNS, conceptLabel() (+39 more)

### Community 3 - "providers.routes.js"
Cohesion: 0.08
Nodes (35): canViewAllWorks(), ASSIGNMENT_FIELDS, assignProviderController, changeProviderStatusController, checkIdentificationController, deleteProviderController, exportProvidersController, getProviderController (+27 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (37): dependencies, apexcharts, axios, date-fns, @emotion/react, @emotion/styled, firebase, @fontsource/inter (+29 more)

### Community 5 - "server/package.json"
Cohesion: 0.05
Nodes (42): axios, @azure/identity, cross-env, dayjs, eslint, @eslint/js, eslint-plugin-sonarjs, excel4node (+34 more)

### Community 6 - "providers.service.js"
Cohesion: 0.07
Nodes (72): assertInScope(), applyAssignmentTypes(), applyProviderTypes(), assertAssignmentDate(), assertIdentification(), assertProviderAssignable(), assertProviderInScope(), assertProviderTypes() (+64 more)

### Community 7 - "constants.js"
Cohesion: 0.04
Nodes (66): getContractMenuAPI(), exportInvoicesAPI(), getInvoiceFilterProvidersAPI(), getInvoiceFilterStagesAPI(), invoicesApi, client_src_hooks_useinvoicemenus, client_src_hooks_useinvoicemenus_usecanviewinvoices, client_src_hooks_useinvoicemenus_useinvoicemenu (+58 more)

### Community 8 - "workScopeOf"
Cohesion: 0.04
Nodes (91): workScopeOf(), CONTRACT_PAIRS, server_src_modules_billing_invoices_invoicemenus_getinvoicemenu, approveInvoiceController, cancelInvoiceController, closeInvoiceFollowUpController, createInvoiceGlossController, deleteInvoiceController (+83 more)

### Community 9 - "InvoiceFormPage.jsx"
Cohesion: 0.05
Nodes (67): getContractAdvanceAPI(), getInvoiceContractsSelectAPI(), getInvoiceFormOptionsAPI(), getInvoiceProvidersSelectAPI(), getInvoiceWorksSelectAPI(), invoiceFollowUpsApi, invoiceGlossesApi, ADR-0017 (+59 more)

### Community 10 - "ConceptDialog.jsx"
Cohesion: 0.06
Nodes (54): contractConceptsApi, contractLiquidationApi, contractsApi, exportContractsAPI(), getContractFieldsAPI(), getContractFilterProvidersAPI(), getContractFilterStagesAPI(), getContractFormOptionsAPI() (+46 more)

### Community 11 - "FundTable.jsx"
Cohesion: 0.19
Nodes (22): cellInput, dateOf(), FundTable(), glossItems(), HEADERS, InvoicesButton(), isAct(), missingOf() (+14 more)

### Community 12 - "auditContext"
Cohesion: 0.05
Nodes (51): jsonwebtoken, socket.io, authenticateHandshake(), getCookieValue(), init(), allowedHosts, isOriginAllowed(), getIO() (+43 more)

### Community 13 - "statements.service.js"
Cohesion: 0.09
Nodes (53): idFilter(), statementsGlosses(), statementsWithGlosses(), affectingValueOf(), amountColumnsOf(), amountTotalsOf(), assertUniqueNumber(), assertValues() (+45 more)

### Community 14 - "client/package.json"
Cohesion: 0.05
Nodes (36): browserslist, development, production, eslintConfig, extends, axios, eslint, @eslint/js (+28 more)

### Community 15 - "PolicyTypePage.jsx"
Cohesion: 0.16
Nodes (14): configurePolicyTypeBaseAPI(), ADR-0019, policyTypesApi, PolicyTypePage, POLICY_BASE_OPTIONS, policyBaseName(), ConfigureBaseDialog(), ADR-0019 (+6 more)

### Community 16 - "expirationNotice.service.js"
Cohesion: 0.07
Nodes (45): ADDRESS_TYPES, CONTRACT_FIELDS, IDENTITY_DOCUMENTS, PAGES, PERMISSIONS, PERMISSIONS_NO_PAGE, POLICY_TYPES, PROVIDER_TYPES (+37 more)

### Community 17 - "workDashboard.service.js"
Cohesion: 0.14
Nodes (38): ADR-0011, moneyText(), ratioPercent(), sumMoney(), ADVANCE_LEVELS, advanceBar(), advanceLevel(), alertsOf() (+30 more)

### Community 18 - "invoices.service.test.js"
Cohesion: 0.07
Nodes (25): concept(), CONCEPTS, contractInput(), ctx, D(), evaluateLiquidation, invoiceStatementTarget, ADR-0020 (+17 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 20 - "permissions.constants.js"
Cohesion: 0.05
Nodes (69): ADR-0012, ADR-0016, ADR-0018, ADR-0019, express, ADR-0011, ADR-0017, ADR-0020 (+61 more)

### Community 21 - "invoices.service.js"
Cohesion: 0.04
Nodes (125): ADR-0013, ADR-0017, ADR-0021, ADR-0023, ADR-0025, ADR-0026, findExportRows(), renderExport() (+117 more)

### Community 22 - "contractInvoiceTerms.js"
Cohesion: 0.08
Nodes (51): percentOf(), percentText(), roundMoney(), toMoney(), toPercent(), assertContractTotal(), blank(), composeContractInvoice() (+43 more)

### Community 23 - "`tbl_users`"
Cohesion: 0.18
Nodes (15): `tbl_documents`, `tbl_notifications`, `tbl_page_permissions`, `tbl_pages`, `tbl_password_resets`, `tbl_permissions`, `tbl_profile_permissions`, `tbl_profiles` (+7 more)

### Community 24 - "withLockedTransaction"
Cohesion: 0.04
Nodes (78): ADR-0004, bcrypt, DELETED_STATUS, INACTIVE_STATUS, AUDIT_OPERATIONS, newOperationId(), canonical(), EXCLUDED_FROM_FINGERPRINT (+70 more)

### Community 25 - "session.service.js"
Cohesion: 0.11
Nodes (27): ADR-0001, baseCookieOptions, createSession(), disconnectSessionSockets(), DURATION_UNITS_MS, newRefreshToken(), REFRESH_COOKIE_NAME, REFRESH_TOKEN_MS (+19 more)

### Community 26 - "contractSuspensions.service.test.js"
Cohesion: 0.05
Nodes (30): CONTRACT_FIELDS_CATALOG, fieldId(), KEY_TO_ID, typeFieldRows(), ADR-0006, row(), ctx, prismaMock (+22 more)

### Community 27 - "withAlpha"
Cohesion: 0.15
Nodes (16): getTimeAgo(), ListItemWrapper(), NotificationList(), typeConfig, Alert(), Chip(), buildPalette(), defaultColor (+8 more)

### Community 28 - "dashboard.service.js"
Cohesion: 0.10
Nodes (36): scopeWhere(), contractsBlock(), finishedWorksToLiquidate(), getDashboardSummary(), invoicesBlock(), invoicesWhere(), ADR-0002, notDeleted (+28 more)

### Community 29 - "invoices.controller.test.js"
Cohesion: 0.05
Nodes (30): mockReq(), emit, fieldsServiceMock, mockDelete, mockSave, emit, followUpsMock, getEffectivePermissionIds (+22 more)

### Community 30 - "audit.service.js"
Cohesion: 0.06
Nodes (43): ctx, run(), adapter, prisma, ACTIVE_STATUS, STATUS_IDS, AUDIT_ENTITIES, auditMisuse() (+35 more)

### Community 31 - "menu-items/index.js"
Cohesion: 0.10
Nodes (14): admin, icons, billing, dashboard, icons, menuItems, icons, other (+6 more)

### Community 32 - "invoiceGlosses.service.js"
Cohesion: 0.11
Nodes (41): GLOSS_FIELD_NAMES, assertReleaser(), auditable(), findLockedOpenGloss(), httpError(), ADR-0027, RELEASE_AUDITED, writeGlossRelease() (+33 more)

### Community 33 - "UserDialog.jsx"
Cohesion: 0.07
Nodes (41): getIdentityDocumentsSelectAPI, deleteProfileAPI(), getProfilesAPI(), paginationProfilesAPI(), deleteUserAPI(), getBasicInformationAPI(), paginationUsersAPI(), saveUserAPI() (+33 more)

### Community 34 - "statementManagement.service.js"
Cohesion: 0.10
Nodes (39): workStatementInvoices(), stageInvoiceWhere(), actAmortization(), assertExtractHasInvoices(), assertScopeExists(), assignPaymentNumber(), counts(), exportScopeReport() (+31 more)

### Community 36 - "providers.service.test.js"
Cohesion: 0.12
Nodes (15): ALL, contact(), ctx, existingRow, input(), ADR-0012, NONE, OTHER (+7 more)

### Community 37 - "WorkChartsTab.jsx"
Cohesion: 0.13
Nodes (31): CardTitle(), clickableChartSx, CONTRACT_NOUN, ContractsByState(), dayOf(), DonutBreakdown(), drillLinkSx, Empty() (+23 more)

### Community 38 - "contracts.controller.js"
Cohesion: 0.05
Nodes (76): moneyRule(), optionalDate(), percentRule(), contractTaxOnlyRules(), simpleAmountRules(), CONTRACT_REPORTS, ACT_FIELDS, cancelContractController (+68 more)

### Community 39 - "cron/index.js"
Cohesion: 0.12
Nodes (16): ref_http, node-cron, app, server, describeTarget(), testConnection(), cronJobs, ADR-0017 (+8 more)

### Community 40 - "works.service.js"
Cohesion: 0.05
Nodes (105): ADR-0007, diffFields(), writeAudit(), containsFilter(), filtersWhere(), addTerm(), dateOnlyText(), daysInMonth() (+97 more)

### Community 41 - "validation.utils.js"
Cohesion: 0.07
Nodes (34): ADR-0009, express-validator, EDITABLE_STATUS_VALUES, createMasterSchemas(), contactsRules(), emailRule(), exportFormatRule(), idempotencyKeyRule() (+26 more)

### Community 42 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/compat, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-jsx-a11y, eslint-plugin-prettier (+6 more)

### Community 44 - "@mui/material"
Cohesion: 0.05
Nodes (65): contractPoliciesApi, appDrawerWidth, drawerWidth, gridSpacing, CardSecondaryAction(), headerStyle, SubCard(), ACTION_TONES (+57 more)

### Community 45 - "MainLayout/index.jsx"
Cohesion: 0.14
Nodes (23): endpoints, handlerDrawerOpen(), initialState, useGetMenuMaster(), setParentOpenedMenu(), useMenuCollapse(), Footer(), Header() (+15 more)

### Community 46 - "scripts"
Cohesion: 0.10
Nodes (20): scripts, build, cron:run, db:check-invariants, db:measure-dashboard, db:seed, db:seed:demo, db:seed:volume (+12 more)

### Community 48 - "fundReportSheet.js"
Cohesion: 0.13
Nodes (32): excelMoney(), addColorLegend(), addFigures(), addHeader(), addMonthRow(), addMovementRow(), addPendingRow(), addTitleAndLegend() (+24 more)

### Community 49 - "`tbl_contracts`"
Cohesion: 0.18
Nodes (8): `tbl_contracts`, `tbl_status`, `tbl_users`, `tbl_contract_concepts`, `tbl_users`, `tbl_contract_status_history`, `tbl_contract_types`, `tbl_providers`

### Community 50 - "StatementsPage.jsx"
Cohesion: 0.11
Nodes (25): exportStatementGroupAPI(), getStatementGroupReportAPI(), paginationStatementGroupsAPI(), useWorkFilterField(), StatementsPage, STATEMENT_GLOSS_FILTER_OPTIONS, STATEMENT_VOUCHER_FILTER_OPTIONS, STATEMENTS_PATH (+17 more)

### Community 51 - "app.js"
Cohesion: 0.13
Nodes (13): compression, cookie-parser, cors, express-fileupload, express-rate-limit, helmet, __dirname, cleanData() (+5 more)

### Community 52 - "decimal"
Cohesion: 0.19
Nodes (19): @prisma/client, decimal(), defaultUtilityConcept(), getContractAdvance(), pendingAdvanceOf(), assertLiquidationCancellable(), assertRefundFits(), assertRetentionFits() (+11 more)

### Community 53 - "formatTime.js"
Cohesion: 0.13
Nodes (13): deleteFileByPath(), uploadFile(), deleteDocApi(), paginationDocsApi(), saveDocApi(), genericRequest, showPromise(), DocumentManagement() (+5 more)

### Community 54 - "`tbl_contract_type_fields`"
Cohesion: 0.20
Nodes (7): `tbl_contract_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_fields`, `tbl_contract_types`, `tbl_users`, `tbl_contract_type_field_versions`

### Community 55 - "contractTerms.js"
Cohesion: 0.10
Nodes (24): server_src_common_utils_money_utils_percentfor, previewContractConcept(), previewContractEndDate(), blank(), CONCEPT_PAIRS, conceptDraftOf(), CONTRACT_ALERT_NAMES, CONTRACT_TRANSITIONS (+16 more)

### Community 56 - "transaction.mock.js"
Cohesion: 0.06
Nodes (29): dbUser, mockDisconnectSockets, mockIn, prismaMock, user, lockedIdsOf(), transactionRawMocks(), ADR-0009 (+21 more)

### Community 57 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, lint:fix, prettier, preview, start

### Community 58 - "contractPolicies.service.js"
Cohesion: 0.11
Nodes (33): insuredValue(), ADR-0019, ADR-0026, POLICY_BASE_NAMES, POLICY_BASES, policyBaseValue(), assertMasters(), assertTypeFree() (+25 more)

### Community 59 - "AuthenticationRoutes.jsx"
Cohesion: 0.12
Nodes (19): client_src_assets_images_interadminpro, MinimalLayout(), AuthenticationRoutes, ForgotPasswordPage, LoginPage, ErrorBoundary(), ErrorMessage(), isStaleDeployError() (+11 more)

### Community 60 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 61 - "excelJS.js"
Cohesion: 0.29
Nodes (6): styleData, styleDataCenter, styleDataFill, styleMoney, styleSubTitles, styleTitle

### Community 62 - "statementManagement.routes.js"
Cohesion: 0.09
Nodes (31): sendExport(), handleExport(), FUND_MOVEMENT_TYPES, deleteFundController, deleteFundMovementController, exportScopeReportController, getManagementController, getScopeReportController (+23 more)

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
Cohesion: 0.05
Nodes (56): ADR-0002, ref_node_crypto, ADDRESS_TYPE, CANCEL_REASONS, CONTRACT_TYPES, CONTRACTS, demoKey(), ensure() (+48 more)

### Community 71 - "showError"
Cohesion: 0.06
Nodes (90): getBusinessRulesAPI(), saveBusinessRulesAPI(), cancelContractAPI(), suspendContractAPI(), getInsurersSelectAPI, invoiceTransitionsApi, getPolicyTypesSelectAPI, getModulesAPI() (+82 more)

### Community 88 - "getEffectivePermissionIds"
Cohesion: 0.07
Nodes (31): getEffectivePermissionIds(), getDashboardDetailController, getDashboardSummaryController, getWorkDashboardController, ADR-0002, dashboardRoutes, ADR-0002, getDashboardDetailSchema (+23 more)

### Community 89 - "`tbl_status`"
Cohesion: 0.13
Nodes (9): `tbl_users`, `tbl_identity_documents`, `tbl_users`, `tbl_provider_types`, `tbl_address_types`, `tbl_insurers`, `tbl_supervision_types`, `tbl_construction_companies` (+1 more)

### Community 94 - "useAuth"
Cohesion: 0.02
Nodes (109): addressTypesApi, constructionCompaniesApi, getConstructionCompaniesSelectAPI, contractTypesApi, getContractTypesSelectAPI, identityDocumentsApi, insurersApi, getPermissionsCatalogAPI() (+101 more)

### Community 100 - "workScope.service.js"
Cohesion: 0.06
Nodes (44): ALL, assertAnyInScope(), httpError(), inScope(), managedWhere(), resolveWorkScope(), scopeOf(), selectMyWorks() (+36 more)

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
Cohesion: 0.18
Nodes (16): getNotificationCountController(), listNotificationsController(), markAllAsReadController(), markAsReadController(), ADR-0001, notificationsRoutes, getNotificationCount(), listNotifications() (+8 more)

### Community 113 - "`tbl_works`"
Cohesion: 0.11
Nodes (14): `tbl_status`, `tbl_users`, `tbl_contract_types`, `tbl_status`, `tbl_users`, `tbl_works`, `tbl_status`, `tbl_users` (+6 more)

### Community 115 - "`tbl_policies`"
Cohesion: 0.13
Nodes (12): `tbl_users`, `tbl_reasons`, `tbl_users`, `tbl_contract_suspensions`, `tbl_contract_concepts`, `tbl_reasons`, `tbl_policies`, `tbl_contract_concepts` (+4 more)

### Community 116 - "fDateOnly"
Cohesion: 0.06
Nodes (84): getStatusesByScopeAPI(), exportContractAPI(), changeWorkStateAPI(), getWorkManagersSelectAPI(), previewWorkEndDateAPI(), ContactsList(), ADR-0009, DataList() (+76 more)

### Community 117 - "export.service.js"
Cohesion: 0.06
Nodes (59): exceljs, pdfkit, addFieldsSheet(), addSheetFooter(), addSheetHeading(), addTableSheet(), buildExcel(), buildExcelDocument() (+51 more)

### Community 118 - "eslint.config.mjs"
Cohesion: 0.15
Nodes (13): asWarnings(), compat, __dirname, __filename, isOff(), @eslint/compat, @eslint/eslintrc, eslint-plugin-jsx-a11y (+5 more)

### Community 119 - "error.middleware.js"
Cohesion: 0.19
Nodes (18): DUPLICATE_FALLBACK_MESSAGE, INTERNAL_UNIQUE_CONSTRAINTS, UNIQUE_CONSTRAINT_MESSAGES, concurrencyError(), duplicateMessage(), errorMiddleware(), isMySqlCode(), ADR-0012 (+10 more)

### Community 120 - "health.routes.test.js"
Cohesion: 0.22
Nodes (7): supertest, getHealthController(), healthRoutes, app, DOWN, healthServiceMock, OK

### Community 123 - "GeneralDashboard.jsx"
Cohesion: 0.17
Nodes (22): getDashboardSummaryAPI(), client_src_hooks_useinvoicemenus_useinvoicemenus, MainCard(), ContractBalanceCards(), DashboardCards(), Indicator(), AlertsCard(), Empty() (+14 more)

### Community 124 - "fMoneyText"
Cohesion: 0.16
Nodes (25): AlertChips(), contractAlertOptions(), fMoneyText(), fPercentText(), AdvanceFilter(), matchesAdvanceFilter(), matchesAdvanceLegend(), advanceDrill() (+17 more)

### Community 125 - "auth.service.js"
Cohesion: 0.08
Nodes (37): ref_crypto, backoff(), buildLockPlan(), ISOLATION_LEVEL, ADR-0027, LOCK_ORDER, LOCK_WAIT_TIMEOUT_SECONDS, LOCKABLE (+29 more)

### Community 129 - "handleFirebase.js"
Cohesion: 0.24
Nodes (6): app, firebaseConfig, storage, deleteFile(), extractFilePathFromURL(), firebase

### Community 130 - "useConfig.js"
Cohesion: 0.18
Nodes (12): config, ConfigContext, ConfigProvider(), useConfig(), useLocalStorage(), ProfileSection(), ElevationScroll(), HorizontalBar() (+4 more)

### Community 131 - "`tbl_providers`"
Cohesion: 0.13
Nodes (11): `tbl_status`, `tbl_users`, `tbl_providers`, `tbl_users`, `tbl_provider_contacts`, `tbl_status`, `tbl_users`, `tbl_work_providers` (+3 more)

### Community 132 - "WorkSummaryTab.jsx"
Cohesion: 0.21
Nodes (21): contractRows(), daysOpenText(), followUpRows(), followUpsDrill(), glossRows(), invoiceRows(), num, initialsOf() (+13 more)

### Community 133 - "ci-summary.mjs"
Cohesion: 0.17
Nodes (20): args, buildSection(), cell(), COLORS, kb(), lineLink(), lintSection(), number() (+12 more)

### Community 134 - "policyTerms.js"
Cohesion: 0.13
Nodes (23): conceptLabel(), contractInvoices(), ADR-0017, ADR-0027, liquidationFacts(), CONCEPT_TYPE_NAMES, CONCEPT_TYPES, assertPolicyStatus() (+15 more)

### Community 136 - "contractFields.js"
Cohesion: 0.26
Nodes (11): AIU_FIELDS, CONFIGURABLE_FIELDS, enforceFields(), FIELD_GROUPS, fromColumn(), hasValue(), httpError(), isBlank() (+3 more)

### Community 137 - "glossFields.js"
Cohesion: 0.16
Nodes (15): ref_node_fs, CONTRACT_LINES, BY_TYPE, byCatalog(), CATALOG_ORDER, fieldAmount(), GLOSS_LINES_SELECT, glossFieldFor() (+7 more)

### Community 140 - "contracts.controller.test.js"
Cohesion: 0.12
Nodes (14): conceptsServiceMock, contractIdsByAdvance, contractsServiceMock, emit, exportContractReport, exportContractSummary, exportPolicyReport, getEffectivePermissionIds (+6 more)

### Community 142 - "advanceFilters.js"
Cohesion: 0.10
Nodes (24): amortizes, CONTRACT_ADVANCE_FILTER_NAMES, CONTRACT_ADVANCE_FILTERS, INVOICE_ADVANCE_FILTER_NAMES, INVOICE_ADVANCE_FILTERS, INVOICE_WHERE, isAdvance, ADR-0024 (+16 more)

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
Cohesion: 0.26
Nodes (7): ref_path, imagesDir, logoDoblamos, logoPavasStay, plantilla2, plantilla3, plantilla1

### Community 175 - "WorkCosts.jsx"
Cohesion: 0.15
Nodes (21): useSchemePalette(), ADVANCE_LEVELS, AdvanceBar(), AdvanceLegend(), num, pendingStripes(), swatchSx, CardTitle() (+13 more)

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

### Community 193 - "httpError"
Cohesion: 0.19
Nodes (24): isAct(), assertCoversPayment(), assertFundExists(), assertLiveWork(), assertPayable(), assertStage(), assertUniqueNumber(), createFund() (+16 more)

### Community 194 - "workDashboard.utils.js"
Cohesion: 0.11
Nodes (20): getDashboardDetailAPI(), ADR-0002, EMPTY_FILTERS, ROWS_BY_KIND, SEARCH_HINTS, SearchField(), useSummaryDrill(), WITHOUT_WORK_FILTER (+12 more)

### Community 197 - "effectivePermissions.service.js"
Cohesion: 0.16
Nodes (17): findUsersWithPermission(), deliverReconciliationReport(), RECONCILIATION_NOTIFICATION_LINES, reportEmails(), insertNotification(), balanceViolations(), CHECKS, findBalanceViolations() (+9 more)

### Community 198 - "MenuList/index.jsx"
Cohesion: 0.31
Nodes (8): getMenuAPI(), getIconByName(), menuEntries(), MenuList(), client_src_menu_items_billing_setbillingmenus, contracts, setContractMenus(), work

### Community 199 - "AuthForgotPassword.jsx"
Cohesion: 0.22
Nodes (14): forgotPasswordAPI(), restorePasswordAPI(), updateThemeModeAPI(), validateCodeAPI(), AnimateButton(), CustomFormControl, hasMixed(), hasNumber() (+6 more)

### Community 201 - "themes/index.jsx"
Cohesion: 0.27
Nodes (7): CSS_VAR_PREFIX, DASHBOARD_PATH, DEFAULT_THEME_MODE, createCustomShadow(), CustomShadows(), ThemeCustomization(), Typography()

### Community 202 - "contractNotifications.service.test.js"
Cohesion: 0.25
Nodes (6): CONTRACT, insertNotification, ADR-0027, logger, prismaMock, state

### Community 203 - "WorksPage.jsx"
Cohesion: 0.06
Nodes (52): getWorkDashboardAPI(), deleteFundMovementAPI(), exportScopeReportAPI(), getManagementAPI(), getScopeReportAPI(), exportWorksAPI(), getMyWorksSelectAPI(), getWorkFilterManagersAPI() (+44 more)

### Community 204 - "liquidationTerms.js"
Cohesion: 0.13
Nodes (14): condition(), ADR-0017, ADR-0018, ADR-0020, ADR-0021, ADR-0024, ADR-0025, LIQUIDATION_CONDITIONS (+6 more)

### Community 206 - "App.jsx"
Cohesion: 0.19
Nodes (12): loginAPI(), logoutAPI(), verifyTokenAPI(), App(), ThemedToastContainer(), AuthContext, AuthProvider(), getStoredUser() (+4 more)

### Community 211 - "ref_jest_globals"
Cohesion: 0.05
Nodes (20): ref_jest_globals, prismaMock, mockValidationResult, prismaMock, txMock, payload, prismaMock, prismaMock (+12 more)

### Community 212 - "contracts.service.js"
Cohesion: 0.07
Nodes (54): ADR-0006, getRuleValues(), typeAppliesAiu(), withContractAiu(), resolveContractTypeFields(), contractsWithPendingAdvanceWhere(), server_src_modules_billing_invoices_invoicemenus_iscontractmode, server_src_modules_billing_invoices_invoicemenus_issimplemode (+46 more)

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

### Community 221 - "advanceTerms.js"
Cohesion: 0.13
Nodes (27): ratioText(), appliedPct(), assertAdvanceCancellable(), assertAdvanceFits(), assertAmortizationFits(), balancesDto(), defaultAmortization(), httpError() (+19 more)

### Community 222 - "uniqueConstraints.constants.test.js"
Cohesion: 0.20
Nodes (11): created, DATABASE, declared, dropped, droppedTables, inDatabase, MIGRATIONS, names() (+3 more)

### Community 224 - "contractConcepts.service.js"
Cohesion: 0.10
Nodes (53): assertContractStillAdmits(), CANCEL_TARGET, cancelContract(), ADR-0027, text(), activeSequence(), amendmentResult(), assertBalancesHold() (+45 more)

### Community 226 - "transaction.service.test.js"
Cohesion: 0.23
Nodes (9): status(), ADR-0027, loggerMock, prismaMock, REAL_DEADLOCK, REAL_LOCK_WAIT_TIMEOUT, realDeadlock(), realLockWaitTimeout() (+1 more)

### Community 227 - "ContactsEditor.jsx"
Cohesion: 0.35
Nodes (10): getAddressTypesSelectAPI, channelsOf(), ContactDialog(), ContactsEditor(), EMPTY, FIELDS, ADR-0009, rowKey() (+2 more)

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

### Community 244 - "money.utils.js"
Cohesion: 0.20
Nodes (8): HUNDRED, isBlank(), MONEY_SCALE, PERCENT_SCALE, RATIO_SCALE, ROUNDING, roundRatio(), ZERO

### Community 245 - "`tbl_invoices`"
Cohesion: 0.27
Nodes (8): `tbl_contracts`, `tbl_users`, `tbl_invoices`, `tbl_fund_movements`, `tbl_rotating_funds`, `tbl_notifications`, `tbl_work_stages`, `tbl_works`

### Community 246 - "workDashboard.service.test.js"
Cohesion: 0.20
Nodes (6): percent(), ALL, CONCEPTS, CONTRACT, OWN, prismaMock

### Community 247 - "contractPolicies.service.test.js"
Cohesion: 0.20
Nodes (5): ctx, ADR-0018, ADR-0019, prismaMock, state

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

### Community 255 - "statementActs.service.test.js"
Cohesion: 0.25
Nodes (6): approved(), ctx, day(), logger, prismaMock, state

### Community 257 - "`tbl_invoice_status_history`"
Cohesion: 0.50
Nodes (3): `tbl_reasons`, `tbl_users`, `tbl_invoice_status_history`

### Community 259 - "expirationNotice.service.test.js"
Cohesion: 0.33
Nodes (4): insertNotification, prismaMock, state, today

### Community 260 - "decisionReferences.guard.test.js"
Cohesion: 0.29
Nodes (6): citations, DECISIONS, files(), ROOT, SELF, SOURCES

### Community 261 - "contractCancellation.service.test.js"
Cohesion: 0.25
Nodes (4): ctx, notifyWorkManagers, prismaMock, state

### Community 262 - "movementValues"
Cohesion: 0.33
Nodes (7): amountsOf(), fundValues(), movementDates(), movementValues(), optionalText(), requiredMoney(), text()

### Community 263 - "policyTypes.service.test.js"
Cohesion: 0.33
Nodes (4): ctx, ADR-0019, prismaMock, state

## Knowledge Gaps
- **1280 isolated node(s):** `MONTHS`, `HEADERS`, `num`, `cellInput`, `ACT_TYPES` (+1275 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1744 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **115 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-0017` connect `invoices.service.js` to `constants.js`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **Why does `ADR-0012` connect `permissions.constants.js` to `fDateOnly`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `@mui/material` connect `@mui/material` to `useConfig.js`, `WorkSummaryTab.jsx`, `constants.js`, `Loadable.jsx`, `InvoiceFormPage.jsx`, `ConceptDialog.jsx`, `FundTable.jsx`, `client/package.json`, `PolicyTypePage.jsx`, `withAlpha`, `NotificationSection/index.jsx`, `UserDialog.jsx`, `WorkChartsTab.jsx`, `MainLayout/index.jsx`, `WorkCosts.jsx`, `StatementsPage.jsx`, `formatTime.js`, `AuthenticationRoutes.jsx`, `workDashboard.utils.js`, `MenuList/index.jsx`, `showError`, `AuthForgotPassword.jsx`, `themes/index.jsx`, `WorksPage.jsx`, `App.jsx`, `useAuth`, `ContactsEditor.jsx`, `fDateOnly`, `DebouncedInput.jsx`, `GeneralDashboard.jsx`, `fMoneyText`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `MONTHS`, `HEADERS`, `num` to the rest of the system?**
  _1280 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `overrides/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `contractReports.service.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07358156028368794 - nodes in this community are weakly interconnected._