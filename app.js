/* ========================================
   BondBox Prototype - Application Logic
   Underwriting-focused layout
   All sample data + render + navigation
   ======================================== */

// ==================== SAMPLE DATA ====================

const sampleARRs = [
    { account: 'R.J. Corman Railroad Group', type: 'Annual', level: 'Branch', dueDate: 'Apr 15, 2024', status: 'Overdue', risk: 'medium', daysOverdue: 12, assignee: 'Jake Miller', grade: 'B+', branch: 'Cincinnati', currentQueue: 'Jake Miller', queueEnteredDate: 'Apr 03, 2024', triggeringStatementId: 'FS-09644', fsDateReceived: '04/01/2024' },
    { account: 'Hensel Phelps Construction Co', type: 'Annual', level: 'Region', dueDate: 'Apr 22, 2024', status: 'Due', risk: 'low', daysOverdue: 0, assignee: 'Jake Miller', grade: 'A', branch: 'Cincinnati', currentQueue: 'Max Miller', queueEnteredDate: 'Apr 10, 2024', triggeringStatementId: 'FS-10247', fsDateReceived: '03/28/2024' },
    { account: 'Turner Construction Company', type: 'Interim', level: 'CAO', dueDate: 'Apr 28, 2024', status: 'In Progress', risk: 'high', daysOverdue: 0, assignee: 'Sarah Mitchell', grade: 'C+', branch: 'New York', currentQueue: 'John Webster', queueEnteredDate: 'Apr 08, 2024', triggeringStatementId: 'FS-09871', fsDateReceived: '04/14/2024' },
    { account: 'Clark Construction Group', type: 'Submission', level: 'Branch', dueDate: 'May 1, 2024', status: 'Due', risk: 'low', daysOverdue: 0, assignee: 'Jake Miller', grade: 'A+', branch: 'Cincinnati', currentQueue: 'Jake Miller', queueEnteredDate: 'Apr 14, 2024', triggeringStatementId: 'FS-10247', fsDateReceived: '04/17/2024' },
    { account: 'Granite Construction Inc', type: 'Annual', level: 'Branch', dueDate: 'May 5, 2024', status: 'Due', risk: 'medium', daysOverdue: 0, assignee: 'Mike Torres', grade: 'B', branch: 'Sacramento', currentQueue: 'Mike Torres', queueEnteredDate: 'Apr 12, 2024', triggeringStatementId: 'FS-09320', fsDateReceived: '04/21/2024' },
    { account: 'Skanska USA Civil', type: 'Annual', level: 'Branch', dueDate: 'Apr 10, 2024', status: 'Overdue', risk: 'high', daysOverdue: 17, assignee: 'Jake Miller', grade: 'C', branch: 'Cincinnati', currentQueue: 'Max Miller', queueEnteredDate: 'Mar 29, 2024', triggeringStatementId: null, fsDateReceived: '03/27/2024' },
    { account: 'Kiewit Corporation', type: 'Annual', level: 'Region', dueDate: 'May 8, 2024', status: 'In Progress', risk: 'low', daysOverdue: 0, assignee: 'Jake Miller', grade: 'A-', branch: 'Cincinnati', currentQueue: 'Jake Miller', queueEnteredDate: 'Apr 15, 2024', triggeringStatementId: null, fsDateReceived: '04/24/2024' },
    { account: 'Brasfield & Gorrie', type: 'Interim', level: 'Branch', dueDate: 'May 12, 2024', status: 'Due', risk: 'medium', daysOverdue: 0, assignee: 'Jake Miller', grade: 'B-', branch: 'Cincinnati', currentQueue: 'Max Miller', queueEnteredDate: 'Apr 11, 2024', triggeringStatementId: null, fsDateReceived: '04/28/2024' },
    { account: 'Walsh Construction Co', type: 'Submission', level: 'Branch', dueDate: 'Apr 20, 2024', status: 'Overdue', risk: 'medium', daysOverdue: 7, assignee: 'Jake Miller', grade: 'B+', branch: 'Cincinnati', currentQueue: 'Jake Miller', queueEnteredDate: 'Apr 01, 2024', triggeringStatementId: null, fsDateReceived: '04/06/2024' },
    { account: 'Flatiron Construction', type: 'Annual', level: 'Region', dueDate: 'May 15, 2024', status: 'Due', risk: 'low', daysOverdue: 0, assignee: 'Jake Miller', grade: 'A+', branch: 'Cincinnati', currentQueue: 'John Webster', queueEnteredDate: 'Apr 13, 2024', triggeringStatementId: null, fsDateReceived: '05/01/2024' },
    { account: 'Manhattan Construction Group', type: 'Annual', level: 'Branch', dueDate: 'May 20, 2024', status: 'In Progress', risk: 'low', daysOverdue: 0, assignee: 'Jake Miller', grade: 'A', branch: 'Cincinnati', currentQueue: 'Jake Miller', queueEnteredDate: 'Apr 12, 2024', triggeringStatementId: null, fsDateReceived: '05/06/2024' },
    { account: 'Sundt Construction', type: 'Interim', level: 'Branch', dueDate: 'May 3, 2024', status: 'Overdue', risk: 'high', daysOverdue: 4, assignee: 'Jake Miller', grade: 'C-', branch: 'Cincinnati', currentQueue: 'Ken Bearley', queueEnteredDate: 'Mar 25, 2024', triggeringStatementId: null, fsDateReceived: '04/19/2024' }
];

const sampleBondRequests = [
    { account: 'Hensel Phelps Construction Co', type: 'Performance & Payment', amount: '$2,400,000', obligee: 'CDOT', status: 'Awaiting Approval', branch: 'Cincinnati', date: 'Apr 18, 2024', assignee: 'Jake Miller' },
    { account: 'Turner Construction Company', type: 'Bid Bond', amount: '$850,000', obligee: 'NYC DOT', status: 'UW Review', branch: 'New York', date: 'Apr 17, 2024', assignee: 'Sarah Mitchell' },
    { account: 'Clark Construction Group', type: 'Performance', amount: '$5,200,000', obligee: 'US Army Corps', status: 'Awaiting Approval', branch: 'Cincinnati', date: 'Apr 16, 2024', assignee: 'Jake Miller' },
    { account: 'R.J. Corman Railroad Group', type: 'Maintenance Bond', amount: '$750,000', obligee: 'CSX Transportation', status: 'Draft', branch: 'Lexington', date: 'Apr 15, 2024', assignee: 'Mike Torres' },
    { account: 'Granite Construction Inc', type: 'Performance & Payment', amount: '$3,100,000', obligee: 'CalTrans', status: 'Approved', branch: 'Cincinnati', date: 'Apr 14, 2024', assignee: 'Jake Miller' },
    { account: 'Kiewit Corporation', type: 'Performance & Payment', amount: '$7,800,000', obligee: 'Nebraska DOT', status: 'UW Review', branch: 'Cincinnati', date: 'Apr 12, 2024', assignee: 'Jake Miller' },
    { account: 'Brasfield & Gorrie LLC', type: 'Bid Bond', amount: '$420,000', obligee: 'City of Birmingham', status: 'Approved', branch: 'Cincinnati', date: 'Apr 10, 2024', assignee: 'Jake Miller' },
    { account: 'McCarthy Building Companies', type: 'Performance', amount: '$4,600,000', obligee: 'MO Dept of Education', status: 'Awaiting Approval', branch: 'Cincinnati', date: 'Apr 8, 2024', assignee: 'Jake Miller' },
    { account: 'Austin Industries', type: 'Performance & Payment', amount: '$2,950,000', obligee: 'TxDOT', status: 'Draft', branch: 'Cincinnati', date: 'Apr 5, 2024', assignee: 'Jake Miller' }
];

const sampleFinancials = [
    { id: 'FS-10247', date: '12/31/2023', term: '12', fye: 'Yes', preparer: 'Jake Miller', firm: 'Deloitte & Touche LLP', auditStatus: 'Audited', balanced: true, approved: true, statementType: 'Annual CPA', dateReceived: '03/28/2024', source: 'Agent' },
    { id: 'FS-10102', date: '12/31/2022', term: '12', fye: 'Yes', preparer: 'Sarah Mitchell', firm: 'Deloitte & Touche LLP', auditStatus: 'Audited', balanced: true, approved: true, statementType: 'Annual CPA', dateReceived: '03/15/2023', source: 'Principal' },
    { id: 'FS-09871', date: '06/30/2023', term: '6', fye: 'No', preparer: 'Jake Miller', firm: 'Deloitte & Touche LLP', auditStatus: 'Reviewed', balanced: true, approved: false, statementType: 'Interim', dateReceived: '09/10/2023', source: 'Agent' },
    { id: 'FS-09644', date: '12/31/2021', term: '12', fye: 'Yes', preparer: 'Mike Torres', firm: 'PricewaterhouseCoopers', auditStatus: 'Audited', balanced: true, approved: true, statementType: 'Annual CPA', dateReceived: '03/20/2022', source: 'System Upload' },
    { id: 'FS-09320', date: '12/31/2020', term: '12', fye: 'Yes', preparer: 'Sarah Mitchell', firm: 'PricewaterhouseCoopers', auditStatus: 'Audited', balanced: false, approved: true, statementType: 'Annual CPA', dateReceived: '04/02/2021', source: 'Principal' },
    { id: 'FS-10401', date: '06/30/2024', term: '6', fye: 'No', preparer: 'Jake Miller', firm: 'Deloitte & Touche LLP', auditStatus: 'Company Prepared', balanced: true, approved: false, statementType: 'Interim', dateReceived: '04/10/2024', source: 'Agent' },
    { id: 'FS-09110', date: '12/31/2019', term: '12', fye: 'Yes', preparer: 'Mike Torres', firm: 'KPMG LLP', auditStatus: 'Audited', balanced: true, approved: true, statementType: 'Annual CPA', dateReceived: '03/25/2020', source: 'Principal' },
    { id: 'FS-08950', date: '06/30/2022', term: '6', fye: 'No', preparer: 'Jake Miller', firm: 'Deloitte & Touche LLP', auditStatus: 'Reviewed', balanced: true, approved: true, statementType: 'Interim', dateReceived: '08/22/2022', source: 'Agent' }
];

const sampleWIPSchedules = [
    { date: '11/17/2023', contractPrice: 8750000, billedToDate: 6200000, costToDate: 5100000, costToComplete: 2850000, totalCost: 7950000, grossProfit: 800000, lastUpdated: '11/20/2023' },
    { date: '12/31/2022', contractPrice: 6500000, billedToDate: 6500000, costToDate: 5800000, costToComplete: 0, totalCost: 5800000, grossProfit: 700000, lastUpdated: '01/15/2023' },
    { date: '12/31/2021', contractPrice: 5200000, billedToDate: 5200000, costToDate: 4600000, costToComplete: 0, totalCost: 4600000, grossProfit: 600000, lastUpdated: '01/10/2022' },
    { date: '06/30/2023', contractPrice: 7400000, billedToDate: 4850000, costToDate: 4200000, costToComplete: 2400000, totalCost: 6600000, grossProfit: 800000, lastUpdated: '07/05/2023' },
    { date: '12/31/2020', contractPrice: 4100000, billedToDate: 4100000, costToDate: 3650000, costToComplete: 0, totalCost: 3650000, grossProfit: 450000, lastUpdated: '01/12/2021' }
];

const sampleWIPJobs = [
    { sort: 1, name: 'Highway 50 Bridge Replacement', contractPrice: 3200000, billedToDate: 2100000, costToDate: 1800000, costToComplete: 1100000, totalCost: 2900000, grossProfit: 300000, pctComplete: 62 },
    { sort: 2, name: 'I-75 Overpass Rehabilitation', contractPrice: 2150000, billedToDate: 1600000, costToDate: 1350000, costToComplete: 650000, totalCost: 2000000, grossProfit: 150000, pctComplete: 68 },
    { sort: 3, name: 'Municipal Water Treatment Plant', contractPrice: 1800000, billedToDate: 1200000, costToDate: 1050000, costToComplete: 600000, totalCost: 1650000, grossProfit: 150000, pctComplete: 64 },
    { sort: 4, name: 'School District Admin Building', contractPrice: 950000, billedToDate: 800000, costToDate: 600000, costToComplete: 300000, totalCost: 900000, grossProfit: 50000, pctComplete: 67 },
    { sort: 5, name: 'County Park Pavilion', contractPrice: 450000, billedToDate: 350000, costToDate: 200000, costToComplete: 150000, totalCost: 350000, grossProfit: 100000, pctComplete: 57 },
    { sort: 6, name: 'Railroad Siding Extension', contractPrice: 200000, billedToDate: 150000, costToDate: 100000, costToComplete: 50000, totalCost: 150000, grossProfit: 50000, pctComplete: 67 }
];

const sampleMasterJobs = [
    { name: 'Highway 50 Bridge Replacement', source: 'WIP', contractAmount: 3200000, status: 'In Progress', bondNumber: '8921045', yearCompleted: '-' },
    { name: 'I-75 Overpass Rehabilitation', source: 'WIP', contractAmount: 2150000, status: 'In Progress', bondNumber: '8453916', yearCompleted: '-' },
    { name: 'Municipal Water Treatment Plant', source: 'WIP', contractAmount: 1800000, status: 'In Progress', bondNumber: 'F801457', yearCompleted: '-' },
    { name: 'Airport Terminal Expansion', source: 'Bonded', contractAmount: 4500000, status: 'Completed', bondNumber: '7124603', yearCompleted: '2023' },
    { name: 'State Capitol Renovation', source: 'Bonded', contractAmount: 3800000, status: 'Completed', bondNumber: 'F634219', yearCompleted: '2022' },
    { name: 'Hospital Wing Addition', source: 'Bonded', contractAmount: 6200000, status: 'Completed', bondNumber: '5012847', yearCompleted: '2021' },
    { name: 'University Science Building', source: 'Bonded', contractAmount: 2800000, status: 'Completed', bondNumber: '4230198', yearCompleted: '2020' }
];

const sampleLargestJobs = [
    { description: 'Hospital Wing Addition', contractAmount: 6200000, grossProfit: 480000, yearCompleted: '2021' },
    { description: 'Airport Terminal Expansion', contractAmount: 4500000, grossProfit: 350000, yearCompleted: '2023' },
    { description: 'State Capitol Renovation', contractAmount: 3800000, grossProfit: 310000, yearCompleted: '2022' },
    { description: 'Highway 50 Bridge Replacement', contractAmount: 3200000, grossProfit: 300000, yearCompleted: '-' },
    { description: 'University Science Building', contractAmount: 2800000, grossProfit: 220000, yearCompleted: '2020' }
];

const sampleLOAs = [
    { type: 'Underwriter', effDate: '01/01/2026', expDate: '12/31/2026', single: 5000000, aggregate: 15000000, toUser: 'Yes', status: 'Active' },
    { type: 'Agent', effDate: '05/15/2025', expDate: '05/14/2026', single: 2000000, aggregate: 8000000, toUser: 'Yes', status: 'Active' },
    { type: 'Underwriter', effDate: '01/01/2025', expDate: '12/31/2025', single: 5000000, aggregate: 15000000, toUser: 'No', status: 'Expired' }
];

// LOA Data for dedicated LOA View
// Today's reference: 04/30/2026
const sampleLOAData = [
    // Active - well into the future
    { account: 'R.J. Corman Railroad Group', type: 'Underwriter', effDate: '01/01/2026', expDate: '12/31/2026', single: 5000000, aggregate: 15000000, used: 8750000, toUser: 'Yes', status: 'Active', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Hensel Phelps Construction Co', type: 'Underwriter', effDate: '03/01/2026', expDate: '02/28/2027', single: 10000000, aggregate: 30000000, used: 12800000, toUser: 'Yes', status: 'Active', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Clark Construction Group', type: 'Underwriter', effDate: '01/01/2026', expDate: '12/31/2026', single: 8000000, aggregate: 25000000, used: 5950000, toUser: 'Yes', status: 'Active', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Mortenson Construction', type: 'Underwriter', effDate: '07/01/2025', expDate: '06/30/2026', single: 6000000, aggregate: 18000000, used: 7200000, toUser: 'Yes', status: 'Active', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Turner Construction Company', type: 'Underwriter', effDate: '06/01/2025', expDate: '05/31/2026', single: 15000000, aggregate: 50000000, used: 22000000, toUser: 'Yes', status: 'Active', branch: 'New York', assignee: 'Sarah Mitchell' },
    { account: 'Whiting-Turner Contracting', type: 'Underwriter', effDate: '04/01/2026', expDate: '03/31/2027', single: 12000000, aggregate: 35000000, used: 8500000, toUser: 'Yes', status: 'Active', branch: 'Baltimore', assignee: 'Sarah Mitchell' },
    // Expiring within 30 days (exp between 04/30/2026 and 05/30/2026)
    { account: 'R.J. Corman Railroad Group', type: 'Agent', effDate: '05/15/2025', expDate: '05/14/2026', single: 2000000, aggregate: 8000000, used: 3200000, toUser: 'Yes', status: 'Active', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Brasfield & Gorrie LLC', type: 'Underwriter', effDate: '05/22/2025', expDate: '05/21/2026', single: 4000000, aggregate: 12000000, used: 6100000, toUser: 'Yes', status: 'Active', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Austin Industries', type: 'Underwriter', effDate: '05/01/2025', expDate: '05/01/2026', single: 3500000, aggregate: 10000000, used: 4800000, toUser: 'Yes', status: 'Active', branch: 'Cincinnati', assignee: 'Jake Miller' },
    // Expired
    { account: 'R.J. Corman Railroad Group', type: 'Underwriter', effDate: '01/01/2025', expDate: '12/31/2025', single: 5000000, aggregate: 15000000, used: 15000000, toUser: 'No', status: 'Expired', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Granite Construction Inc', type: 'Underwriter', effDate: '07/01/2024', expDate: '06/30/2025', single: 7000000, aggregate: 20000000, used: 9000000, toUser: 'No', status: 'Expired', branch: 'Cincinnati', assignee: 'Jake Miller' },
    { account: 'Cadell Construction Co', type: 'Underwriter', effDate: '01/01/2024', expDate: '12/31/2024', single: 3000000, aggregate: 9000000, used: 9000000, toUser: 'No', status: 'Expired', branch: 'Cincinnati', assignee: 'Jake Miller' }
];

// Master Accounts List (Active + Suspended)
const sampleMyAccounts = [
    { name: 'R.J. Corman Railroad Group', branch: 'Cincinnati', status: 'Active', customerNumber: '0008397740', accountId: '1016829', accountGrade: 'B+', assignee: 'Jake Miller' },
    { name: 'Hensel Phelps Construction Co', branch: 'Cincinnati', status: 'Active', customerNumber: '0008451220', accountId: '1018445', accountGrade: 'A', assignee: 'Jake Miller' },
    { name: 'Clark Construction Group', branch: 'Cincinnati', status: 'Active', customerNumber: '0008503100', accountId: '1019102', accountGrade: 'A+', assignee: 'Jake Miller' },
    { name: 'Granite Construction Inc', branch: 'Cincinnati', status: 'Active', customerNumber: '0008390112', accountId: '1016550', accountGrade: 'C+', assignee: 'Jake Miller' },
    { name: 'McCarthy Building Companies', branch: 'Cincinnati', status: 'Active', customerNumber: '0008522080', accountId: '1019877', accountGrade: 'A-', assignee: 'Jake Miller' },
    { name: 'Brasfield & Gorrie LLC', branch: 'Cincinnati', status: 'Active', customerNumber: '0008534410', accountId: '1020134', accountGrade: 'B', assignee: 'Jake Miller' },
    { name: 'Austin Industries', branch: 'Cincinnati', status: 'Active', customerNumber: '0008540990', accountId: '1020388', accountGrade: 'B-', assignee: 'Jake Miller' },
    { name: 'Mortenson Construction', branch: 'Cincinnati', status: 'Active', customerNumber: '0008551770', accountId: '1020645', accountGrade: 'A', assignee: 'Jake Miller' },
    { name: 'Cadell Construction Co', branch: 'Cincinnati', status: 'Suspended', customerNumber: '0008410550', accountId: '1017201', accountGrade: 'C-', assignee: 'Jake Miller', suspendedReason: 'Financial deterioration — negative working capital and Z-Score below threshold for 3 consecutive quarters' },
    { name: 'Traylor Bros Inc', branch: 'Cincinnati', status: 'Suspended', customerNumber: '0008425880', accountId: '1017590', accountGrade: 'C-', assignee: 'Jake Miller', suspendedReason: 'LOA expired 12/31/2023 — pending annual review completion and updated financials' },
    { name: 'Primoris Services Corp', branch: 'Cincinnati', status: 'Suspended', customerNumber: '0008438220', accountId: '1017845', accountGrade: 'C', assignee: 'Jake Miller', suspendedReason: 'Outstanding claim (CL-2024-0102) exceeds 10% of bonding program — account under claims review hold' }
];

const sampleRedFlagData = {
    'R.J. Corman Railroad Group': {
        branch: 'Cincinnati', grade: 'B+', assignee: 'Jake Miller',
        periods: [
            { fsType: 'Interim', date: '09/30/2023', auditStatus: 'Management' },
            { fsType: 'Fiscal', date: '12/31/2022', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2021', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2020', auditStatus: 'Audited' }
        ],
        ratios: {
            'Z-Score':       [{ v: -0.05, flag: true },  { v: -0.73, flag: true },  { v: 0.43, flag: false }, { v: 0.53, flag: true }],
            'Debt/Equity':   [{ v: 1.28, flag: false },   { v: 1.45, flag: false },   { v: 1.06, flag: false },  { v: 1.04, flag: false }],
            'Net Quick/LOA': [{ v: 0.0, flag: true },     { v: 0.0, flag: true },     { v: 0.0, flag: true },    { v: 0.0, flag: true }],
            'Net Worth/LOA': [{ v: 0.0, flag: true },     { v: 0.0, flag: true },     { v: 0.0, flag: true },    { v: 0.0, flag: true }],
            'Net Quick/WOH': [{ v: 4.6, flag: true },     { v: 4.0, flag: true },     { v: 5.0, flag: false },   { v: 5.3, flag: false }],
            'Net Worth/WOH': [{ v: 7.1, flag: true },     { v: 6.2, flag: true },     { v: 6.0, flag: false },   { v: 6.1, flag: false }],
            'UB/Net Quick':  [{ v: 16.3, flag: false },   { v: 18.0, flag: false },   { v: 14.3, flag: false },  { v: 15.5, flag: false }],
            'UB/Net Worth':  [{ v: 10.5, flag: false },   { v: 12.6, flag: false },   { v: 11.2, flag: false },  { v: 13.4, flag: false }]
        }
    },
    'Turner Construction Company': {
        branch: 'New York', grade: 'C+', assignee: 'Sarah Mitchell',
        periods: [
            { fsType: 'Interim', date: '06/30/2023', auditStatus: 'Management' },
            { fsType: 'Fiscal', date: '12/31/2022', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2021', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2020', auditStatus: 'Audited' }
        ],
        ratios: {
            'Z-Score':       [{ v: -1.20, flag: true },  { v: -0.85, flag: true },  { v: -0.30, flag: true },  { v: 0.15, flag: false }],
            'Debt/Equity':   [{ v: 2.10, flag: true },    { v: 1.95, flag: true },    { v: 1.60, flag: false },  { v: 1.35, flag: false }],
            'Net Quick/LOA': [{ v: 0.0, flag: true },     { v: 0.0, flag: true },     { v: 2.1, flag: false },   { v: 3.5, flag: false }],
            'Net Worth/LOA': [{ v: 0.0, flag: true },     { v: 0.0, flag: true },     { v: 1.8, flag: false },   { v: 2.9, flag: false }],
            'Net Quick/WOH': [{ v: 2.1, flag: true },     { v: 3.2, flag: true },     { v: 4.8, flag: false },   { v: 5.1, flag: false }],
            'Net Worth/WOH': [{ v: 3.5, flag: true },     { v: 4.1, flag: true },     { v: 5.5, flag: false },   { v: 6.0, flag: false }],
            'UB/Net Quick':  [{ v: 22.5, flag: true },    { v: 19.8, flag: false },   { v: 15.0, flag: false },  { v: 13.2, flag: false }],
            'UB/Net Worth':  [{ v: 18.2, flag: true },    { v: 15.5, flag: false },   { v: 12.0, flag: false },  { v: 10.8, flag: false }]
        }
    },
    'Hensel Phelps Construction Co': {
        branch: 'Cincinnati', grade: 'A-', assignee: 'Jake Miller',
        periods: [
            { fsType: 'Fiscal', date: '12/31/2023', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2022', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2021', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2020', auditStatus: 'Audited' }
        ],
        ratios: {
            'Z-Score':       [{ v: 1.85, flag: false },   { v: 1.60, flag: false },   { v: 1.40, flag: false },  { v: 1.25, flag: false }],
            'Debt/Equity':   [{ v: 0.65, flag: false },   { v: 0.72, flag: false },   { v: 0.80, flag: false },  { v: 0.85, flag: false }],
            'Net Quick/LOA': [{ v: 8.5, flag: false },    { v: 7.2, flag: false },    { v: 6.0, flag: false },   { v: 5.5, flag: false }],
            'Net Worth/LOA': [{ v: 12.0, flag: false },   { v: 10.5, flag: false },   { v: 9.8, flag: false },   { v: 9.0, flag: false }],
            'Net Quick/WOH': [{ v: 10.2, flag: false },   { v: 9.0, flag: false },    { v: 8.5, flag: false },   { v: 7.8, flag: false }],
            'Net Worth/WOH': [{ v: 14.5, flag: false },   { v: 13.0, flag: false },   { v: 12.2, flag: false },  { v: 11.5, flag: false }],
            'UB/Net Quick':  [{ v: 8.0, flag: false },    { v: 9.5, flag: false },    { v: 10.2, flag: false },  { v: 11.0, flag: false }],
            'UB/Net Worth':  [{ v: 5.5, flag: false },    { v: 6.8, flag: false },    { v: 7.5, flag: false },   { v: 8.0, flag: false }]
        }
    },
    'Granite Construction Inc': {
        branch: 'Sacramento', grade: 'B-', assignee: 'Mike Torres',
        periods: [
            { fsType: 'Interim', date: '06/30/2023', auditStatus: 'Management' },
            { fsType: 'Fiscal', date: '12/31/2022', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2021', auditStatus: 'Audited' },
            { fsType: 'Prior', date: '12/31/2020', auditStatus: 'Audited' }
        ],
        ratios: {
            'Z-Score':       [{ v: 0.20, flag: false },   { v: -0.15, flag: true },   { v: 0.35, flag: false },  { v: 0.60, flag: false }],
            'Debt/Equity':   [{ v: 1.55, flag: true },    { v: 1.70, flag: true },    { v: 1.30, flag: false },  { v: 1.15, flag: false }],
            'Net Quick/LOA': [{ v: 0.0, flag: true },     { v: 0.0, flag: true },     { v: 1.5, flag: false },   { v: 2.0, flag: false }],
            'Net Worth/LOA': [{ v: 0.0, flag: true },     { v: 0.0, flag: true },     { v: 1.2, flag: false },   { v: 1.8, flag: false }],
            'Net Quick/WOH': [{ v: 3.8, flag: true },     { v: 3.5, flag: true },     { v: 5.2, flag: false },   { v: 5.8, flag: false }],
            'Net Worth/WOH': [{ v: 5.5, flag: false },    { v: 5.0, flag: true },     { v: 6.8, flag: false },   { v: 7.2, flag: false }],
            'UB/Net Quick':  [{ v: 20.0, flag: true },    { v: 21.5, flag: true },    { v: 16.0, flag: false },  { v: 14.5, flag: false }],
            'UB/Net Worth':  [{ v: 14.8, flag: false },   { v: 16.0, flag: true },    { v: 12.5, flag: false },  { v: 11.0, flag: false }]
        }
    }
};

const sampleBidLog = [
    { bidDate: '04/15/2024', projectName: 'Highway 50 Bridge Replacement', obligee: 'State DOT', contractValue: 3200000, warranty: '24 Mo.', bidBondAmt: 160000, potentialBacklog: 3200000, bidResult: 'Low', bidResultAmt: 3200000, status: 'Approved Bid', doa: 'Branch' },
    { bidDate: '04/10/2024', projectName: 'County Water Main Extension', obligee: 'County Utilities', contractValue: 1500000, warranty: '12 Mo.', bidBondAmt: 75000, potentialBacklog: 1500000, bidResult: 'Pending', bidResultAmt: 0, status: 'Pending Bid', doa: 'Branch' },
    { bidDate: '04/05/2024', projectName: 'Municipal Parking Garage', obligee: 'City of Springfield', contractValue: 4800000, warranty: '24 Mo.', bidBondAmt: 240000, potentialBacklog: 4800000, bidResult: 'Low', bidResultAmt: 4800000, status: 'Approved Bid', doa: 'Region' },
    { bidDate: '04/22/2024', projectName: 'Wastewater Treatment Plant Upgrade', obligee: 'Metro Water District', contractValue: 6500000, warranty: '36 Mo.', bidBondAmt: 325000, potentialBacklog: 6500000, bidResult: 'Pending', bidResultAmt: 0, status: 'Pending Bid', doa: 'Region' },
    { bidDate: '04/18/2024', projectName: 'Elementary School HVAC Replacement', obligee: 'Jefferson County Schools', contractValue: 890000, warranty: '12 Mo.', bidBondAmt: 44500, potentialBacklog: 890000, bidResult: 'Pending', bidResultAmt: 0, status: 'Pending Bid', doa: 'Branch' },
    { bidDate: '04/25/2024', projectName: 'Downtown Parking Structure', obligee: 'City of Lexington', contractValue: 3800000, warranty: '24 Mo.', bidBondAmt: 190000, potentialBacklog: 3800000, bidResult: 'Pending', bidResultAmt: 0, status: 'Pending Bid', doa: 'Branch' },
    { bidDate: '04/02/2024', projectName: 'Fire Station #12 Construction', obligee: 'City of Denver', contractValue: 2200000, warranty: '24 Mo.', bidBondAmt: 110000, potentialBacklog: 2200000, bidResult: 'Low', bidResultAmt: 2200000, status: 'Approved Bid', doa: 'Branch' },
    { bidDate: '03/28/2024', projectName: 'School Gymnasium Renovation', obligee: 'School District 42', contractValue: 920000, warranty: '12 Mo.', bidBondAmt: 46000, potentialBacklog: 920000, bidResult: '2nd', bidResultAmt: 950000, status: 'Closed Bid', doa: 'Branch' },
    { bidDate: '03/20/2024', projectName: 'Airport Runway Repair', obligee: 'FAA', contractValue: 2100000, warranty: '36 Mo.', bidBondAmt: 105000, potentialBacklog: 0, bidResult: 'Low', bidResultAmt: 2100000, status: 'Convert to Bond', doa: 'Region' },
    { bidDate: '03/15/2024', projectName: 'Railroad Signal Upgrade', obligee: 'CSX Transportation', contractValue: 780000, warranty: '12 Mo.', bidBondAmt: 39000, potentialBacklog: 780000, bidResult: 'Pending', bidResultAmt: 0, status: 'Pending Bid', doa: 'Branch' },
    { bidDate: '03/01/2024', projectName: 'Interstate Rest Area Construction', obligee: 'State DOT', contractValue: 1250000, warranty: '24 Mo.', bidBondAmt: 62500, potentialBacklog: 0, bidResult: '3rd', bidResultAmt: 1300000, status: 'Closed Bid', doa: 'Branch' },
    { bidDate: '03/11/2024', projectName: 'Library Annex Foundation Repair', obligee: 'County Library Board', contractValue: 450000, warranty: '12 Mo.', bidBondAmt: 22500, potentialBacklog: 450000, bidResult: 'Pending', bidResultAmt: 0, status: 'Pending Bid', doa: 'Branch' },
    { bidDate: '03/05/2024', projectName: 'State Capitol Roof Restoration', obligee: 'State DGS', contractValue: 1800000, warranty: '24 Mo.', bidBondAmt: 90000, potentialBacklog: 1800000, bidResult: 'Low', bidResultAmt: 1800000, status: 'Approved Bid', doa: 'Region' }
];

// ==================== REMINDERS ====================
const sampleReminders = [
    { id: 1, title: 'Follow up on Hensel Phelps WIP schedule', date: '04/15/2024', time: '09:00 AM', account: 'Hensel Phelps Construction Co', notes: 'Request updated WIP by May deadline', alertOnDashboard: true, status: 'Active' },
    { id: 2, title: 'Review Clark Construction LOA renewal', date: '04/18/2024', time: '10:30 AM', account: 'Clark Construction Group', notes: 'LOA expires in 45 days — schedule renewal discussion', alertOnDashboard: true, status: 'Active' },
    { id: 3, title: 'Call Granite Construction re: backlog decline', date: '04/16/2024', time: '02:00 PM', account: 'Granite Construction Inc', notes: 'Backlog down 15% YoY per last visit — get updated figures', alertOnDashboard: true, status: 'Active' },
    { id: 4, title: 'Submit Austin Industries bond conversion', date: '04/22/2024', time: '08:00 AM', account: 'Austin Industries', notes: 'Airport Runway Repair bid won — convert to performance bond', alertOnDashboard: true, status: 'Active' },
    { id: 5, title: 'Quarterly portfolio review prep', date: '04/25/2024', time: '11:00 AM', account: '', notes: 'Prepare portfolio summary deck for regional review meeting', alertOnDashboard: true, status: 'Active' },
    { id: 6, title: 'R.J. Corman financial statements due', date: '04/10/2024', time: '09:00 AM', account: 'R.J. Corman Railroad Group', notes: 'FY2023 CPA statements expected — follow up if not received', alertOnDashboard: false, status: 'Completed' }
];
let nextReminderId = 7;

const sampleAccountReviews = [
    {
        reviewDate: '04/15/2024', reviewLevel: 'Branch', reviewType: 'Annual', fsDate: '12/31/2023',
        reviewState: 'Initial Review', reviewedBy: 'Jake Miller', reviewRating: '-',
        originatingUW: 'Jake Miller', currentQueue: 'Jake Miller', queueEnteredDate: 'Apr 15, 2024',
        triggeringStatementId: 'FS-10247', fsDateReceived: '04/01/2024',
        signOffHistory: [
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Created', date: '04/15/2024', state: 'Initial Review', comments: 'Starting annual review for FY2023' }
        ]
    },
    {
        reviewDate: '04/10/2023', reviewLevel: 'Branch', reviewType: 'Annual', fsDate: '12/31/2022',
        reviewState: 'Complete', reviewedBy: 'Sarah Mitchell', reviewRating: 'Acceptable',
        originatingUW: 'Sarah Mitchell', currentQueue: null, queueEnteredDate: null,
        triggeringStatementId: 'FS-10102', fsDateReceived: '03/15/2023',
        signOffHistory: [
            { reviewer: 'Sarah Mitchell', title: 'Sr. Underwriter', action: 'Created', date: '03/28/2023', state: 'Initial Review', comments: 'Annual review initiated' },
            { reviewer: 'Sarah Mitchell', title: 'Sr. Underwriter', action: 'Submitted', date: '04/05/2023', state: 'Pending Manager Review', comments: 'Analysis complete, promoting to manager' },
            { reviewer: 'Amy Rodriguez', title: 'Regional Manager', action: 'Approved', date: '04/10/2023', state: 'Complete', comments: 'Acceptable risk. Approved at branch level.' }
        ]
    },
    {
        reviewDate: '09/15/2022', reviewLevel: 'Region', reviewType: 'Interim', fsDate: '06/30/2022',
        reviewState: 'Complete', reviewedBy: 'Jake Miller', reviewRating: 'Acceptable',
        originatingUW: 'Jake Miller', currentQueue: null, queueEnteredDate: null,
        triggeringStatementId: null, fsDateReceived: '08/20/2022',
        signOffHistory: [
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Created', date: '09/01/2022', state: 'Initial Review', comments: 'Interim review for H1 2022' },
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Submitted', date: '09/08/2022', state: 'Pending Regional Review', comments: 'Submitting for regional manager review' },
            { reviewer: 'Max Miller', title: 'Regional Manager', action: 'Approved', date: '09/15/2022', state: 'Complete', comments: 'Approved. No concerns at regional level.' }
        ]
    },
    {
        reviewDate: '04/12/2022', reviewLevel: 'Branch', reviewType: 'Annual', fsDate: '12/31/2021',
        reviewState: 'Complete', reviewedBy: 'Mike Torres', reviewRating: 'Marginal',
        originatingUW: 'Mike Torres', currentQueue: null, queueEnteredDate: null,
        triggeringStatementId: 'FS-09644', fsDateReceived: '03/20/2022',
        signOffHistory: [
            { reviewer: 'Mike Torres', title: 'Underwriter', action: 'Created', date: '03/30/2022', state: 'Initial Review', comments: 'Annual review — some financial concerns noted' },
            { reviewer: 'Mike Torres', title: 'Underwriter', action: 'Submitted', date: '04/06/2022', state: 'Pending Manager Review', comments: 'Margins declining, recommending closer monitoring' },
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Approved', date: '04/12/2022', state: 'Complete', comments: 'Marginal rating agreed. Set review frequency to semi-annual.' }
        ]
    },
    {
        reviewDate: '04/08/2024', reviewLevel: 'Branch', reviewType: 'Interim', fsDate: '09/30/2023',
        reviewState: 'In Review - Branch Manager', reviewedBy: 'Jake Miller', reviewRating: '-',
        originatingUW: 'Jake Miller', currentQueue: 'Max Miller', queueEnteredDate: 'Apr 06, 2024',
        triggeringStatementId: 'FS-09871', fsDateReceived: '03/25/2024',
        signOffHistory: [
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Created', date: '03/25/2024', state: 'Initial Review', comments: 'Interim review — Q3 financials received' },
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Submitted', date: '04/06/2024', state: 'Pending Regional Review', comments: 'Cash flow tightening slightly but backlog remains solid' }
        ]
    },
    {
        reviewDate: '03/20/2024', reviewLevel: 'CAO', reviewType: 'Annual', fsDate: '12/31/2023',
        reviewState: 'In Review - VP Underwriting', reviewedBy: 'Jake Miller', reviewRating: '-',
        originatingUW: 'Jake Miller', currentQueue: 'John Webster', queueEnteredDate: 'Apr 01, 2024',
        triggeringStatementId: 'FS-10247', fsDateReceived: '03/06/2024',
        signOffHistory: [
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Created', date: '03/01/2024', state: 'Initial Review', comments: 'CAO-level annual review — large account requiring full chain approval' },
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Submitted', date: '03/12/2024', state: 'Pending Regional Review', comments: 'Analysis complete. Aggregate exposure warrants CAO sign-off.' },
            { reviewer: 'Max Miller', title: 'Regional Manager', action: 'Approved & Promoted', date: '03/28/2024', state: 'Pending VP Review', comments: 'Exposure within regional tolerance. Promoting to VP for CAO-level sign-off.' }
        ]
    },
    {
        reviewDate: '10/20/2021', reviewLevel: 'Branch', reviewType: 'Annual', fsDate: '06/30/2021',
        reviewState: 'Complete', reviewedBy: 'Jake Miller', reviewRating: 'Acceptable',
        originatingUW: 'Jake Miller', currentQueue: null, queueEnteredDate: null,
        triggeringStatementId: null, fsDateReceived: '09/28/2021',
        signOffHistory: [
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Created', date: '10/01/2021', state: 'Initial Review', comments: 'Annual review — strong year for principal' },
            { reviewer: 'Jake Miller', title: 'Branch Manager', action: 'Submitted', date: '10/12/2021', state: 'Pending Regional Review', comments: 'Financials healthy, recommend maintaining current limits' },
            { reviewer: 'Max Miller', title: 'Regional Manager', action: 'Approved', date: '10/20/2021', state: 'Complete', comments: 'Agreed. Acceptable rating confirmed.' }
        ]
    }
];

const sampleBonds = [
    { bondNumber: '4127935', principal: 'R.J. Corman Railroad Group', bondType: 'Performance & Payment', amount: '$3,200,000', effectiveDate: '03/15/2024', expirationDate: '03/15/2026', status: 'Active' },
    { bondNumber: '3410582', principal: 'R.J. Corman Railroad Group', bondType: 'Bid Bond', amount: '$160,000', effectiveDate: '02/01/2024', expirationDate: '05/01/2024', status: 'Active' },
    { bondNumber: '8921045', principal: 'Hensel Phelps Construction Co', bondType: 'Performance', amount: '$5,200,000', effectiveDate: '11/01/2023', expirationDate: '11/01/2025', status: 'Active' },
    { bondNumber: '8453916', principal: 'Turner Construction Company', bondType: 'Performance & Payment', amount: '$8,500,000', effectiveDate: '09/15/2023', expirationDate: '09/15/2025', status: 'Active' },
    { bondNumber: 'F801457', principal: 'Clark Construction Group', bondType: 'Maintenance Bond', amount: '$750,000', effectiveDate: '08/01/2023', expirationDate: '08/01/2024', status: 'Expiring Soon' },
    { bondNumber: '7124603', principal: 'Granite Construction Inc', bondType: 'Performance', amount: '$4,500,000', effectiveDate: '06/15/2022', expirationDate: '06/15/2024', status: 'Expiring Soon' },
    { bondNumber: 'F634219', principal: 'R.J. Corman Railroad Group', bondType: 'Performance', amount: '$2,800,000', effectiveDate: '03/01/2021', expirationDate: '03/01/2023', status: 'Expired' },
    { bondNumber: '4883716', principal: 'Kiewit Corporation', bondType: 'Performance & Payment', amount: '$7,800,000', effectiveDate: '04/01/2024', expirationDate: '04/01/2027', status: 'Active' },
    { bondNumber: 'F465182', principal: 'Brasfield & Gorrie LLC', bondType: 'Bid Bond', amount: '$420,000', effectiveDate: '03/20/2024', expirationDate: '06/20/2024', status: 'Active' },
    { bondNumber: '5014829', principal: 'McCarthy Building Companies', bondType: 'Performance', amount: '$4,600,000', effectiveDate: '04/08/2024', expirationDate: '04/08/2026', status: 'Active' },
    { bondNumber: '7780342', principal: 'Austin Industries', bondType: 'Performance & Payment', amount: '$2,950,000', effectiveDate: '07/15/2023', expirationDate: '07/15/2025', status: 'Active' },
    { bondNumber: '6901538', principal: 'Hensel Phelps Construction Co', bondType: 'Payment Bond', amount: '$2,400,000', effectiveDate: '05/01/2022', expirationDate: '05/01/2024', status: 'Expiring Soon' },
    { bondNumber: '5209463', principal: 'Mortenson Construction', bondType: 'Bid Bond', amount: '$310,000', effectiveDate: '04/12/2024', expirationDate: '07/12/2024', status: 'Active' }
];

const sampleClaims = [
    { claimNumber: 'CL-2024-0087', bondNumber: '7124603', principal: 'Granite Construction Inc', claimant: 'SubCo Materials LLC', amount: '$245,000', filedDate: '03/20/2024', status: 'Investigating' },
    { claimNumber: 'CL-2023-0156', bondNumber: 'F634219', principal: 'R.J. Corman Railroad Group', claimant: 'Valley Electric Co', amount: '$89,000', filedDate: '11/05/2023', status: 'Open' },
    { claimNumber: 'CL-2023-0092', bondNumber: 'F801457', principal: 'Clark Construction Group', claimant: 'Metro Plumbing Inc', amount: '$156,000', filedDate: '08/15/2023', status: 'Closed' },
    { claimNumber: 'CL-2024-0102', bondNumber: '7780342', principal: 'Austin Industries', claimant: 'Lone Star Steel Supply', amount: '$178,500', filedDate: '04/02/2024', status: 'Investigating' },
    { claimNumber: 'CL-2024-0095', bondNumber: '6901538', principal: 'Hensel Phelps Construction Co', claimant: 'Rocky Mountain Concrete', amount: '$312,000', filedDate: '02/14/2024', status: 'Open' },
    { claimNumber: 'CL-2022-0204', bondNumber: 'F634219', principal: 'R.J. Corman Railroad Group', claimant: 'Bluegrass Hauling LLC', amount: '$67,500', filedDate: '06/22/2022', status: 'Closed' },
    { claimNumber: 'CL-2024-0118', bondNumber: '4883716', principal: 'Kiewit Corporation', claimant: 'Heartland Excavation Co', amount: '$425,000', filedDate: '04/10/2024', status: 'Open' }
];

const sampleVisitations = [
    { account: 'R.J. Corman Railroad Group', visitDate: '03/12/2024', visitType: 'In-Person', visitedBy: 'Jake Miller', agency: 'Brown & Brown Insurance', location: 'Nicholasville, KY - Corporate HQ', contactMet: 'Rick Corman (Owner), Bill Hayes (CFO)', purpose: 'Annual Visit', backlogDiscussed: true, financialsDiscussed: true, equipmentReviewed: true, safetyReviewed: false, overallImpression: 'Positive', followUpRequired: false, followUpDate: '', notes: 'Strong year operationally. Backlog healthy at $8.7M. New equipment purchases planned for Q3. CFO confident in maintaining margins.', branch: 'Cincinnati' },
    { account: 'Hensel Phelps Construction Co', visitDate: '02/20/2024', visitType: 'In-Person', visitedBy: 'Jake Miller', agency: 'Marsh McLennan Agency', location: 'Greeley, CO - Main Office', contactMet: 'Mike Choutka (CEO), Janet Lewis (Controller)', purpose: 'ARR Follow-Up', backlogDiscussed: true, financialsDiscussed: true, equipmentReviewed: false, safetyReviewed: true, overallImpression: 'Positive', followUpRequired: true, followUpDate: '05/15/2024', notes: 'Reviewed FY2023 financials in detail. Revenue up 12%. Safety program impressive — TRIR well below industry avg. Need updated WIP by May.', branch: 'Cincinnati' },
    { account: 'Clark Construction Group', visitDate: '01/18/2024', visitType: 'In-Person', visitedBy: 'Jake Miller', agency: 'Aon Surety', location: 'Bethesda, MD - Corporate Office', contactMet: 'Peter Forster (VP Surety), Diana Cho (CFO)', purpose: 'Relationship Mgmt', backlogDiscussed: true, financialsDiscussed: false, equipmentReviewed: false, safetyReviewed: false, overallImpression: 'Positive', followUpRequired: false, followUpDate: '', notes: 'General relationship meeting. Discussed upcoming federal projects pipeline. They expect $50M+ in new bids Q2. LOA increase discussion tabled for annual review.', branch: 'Cincinnati' },
    { account: 'Turner Construction Company', visitDate: '03/05/2024', visitType: 'Virtual', visitedBy: 'Sarah Mitchell', agency: 'Willis Towers Watson', location: 'Video Conference', contactMet: 'Tom Regan (Surety Liaison), Mark Peters (CFO)', purpose: 'ARR Follow-Up', backlogDiscussed: true, financialsDiscussed: true, equipmentReviewed: false, safetyReviewed: false, overallImpression: 'Neutral', followUpRequired: true, followUpDate: '04/30/2024', notes: 'Interim financials show margin compression on two large NYC projects. CFO attributes to supply chain costs. Need to monitor WIP fade closely.', branch: 'New York' },
    { account: 'Granite Construction Inc', visitDate: '11/15/2023', visitType: 'In-Person', visitedBy: 'Mike Torres', agency: 'Lockton Companies', location: 'Watsonville, CA - HQ', contactMet: 'Kyle Larkin (President), Susan Park (Treasury)', purpose: 'Annual Visit', backlogDiscussed: true, financialsDiscussed: true, equipmentReviewed: true, safetyReviewed: true, overallImpression: 'Concerns Noted', followUpRequired: true, followUpDate: '02/15/2024', notes: 'Backlog down 15% YoY. Heavy equipment showing age — deferred capex a concern. Safety record has slipped. Recommended closer monitoring of WIP and cashflow.', branch: 'Sacramento' },
    { account: 'Whiting-Turner Contracting', visitDate: '04/02/2024', visitType: 'In-Person', visitedBy: 'Sarah Mitchell', agency: 'USI Insurance Services', location: 'Baltimore, MD - Corporate Office', contactMet: 'Tim Regan (EVP), Carol Hughes (Controller)', purpose: 'New Account', backlogDiscussed: true, financialsDiscussed: true, equipmentReviewed: false, safetyReviewed: true, overallImpression: 'Positive', followUpRequired: true, followUpDate: '05/01/2024', notes: 'Initial visit for new account setup. Strong balance sheet, diversified project mix. Safety program is top-tier. Requesting $12M single / $35M aggregate LOA.', branch: 'Baltimore' },
    { account: 'R.J. Corman Railroad Group', visitDate: '09/22/2023', visitType: 'Job Site', visitedBy: 'Jake Miller', agency: 'Brown & Brown Insurance', location: 'Highway 50 Bridge Project Site, KY', contactMet: 'Dave Marshall (Project Manager)', purpose: 'Job Site Inspection', backlogDiscussed: false, financialsDiscussed: false, equipmentReviewed: true, safetyReviewed: true, overallImpression: 'Positive', followUpRequired: false, followUpDate: '', notes: 'Visited Highway 50 bridge project — on schedule, within budget. Equipment well-maintained. Crew experienced. No safety concerns observed.', branch: 'Cincinnati' },
    { account: 'Hensel Phelps Construction Co', visitDate: '08/10/2023', visitType: 'Job Site', visitedBy: 'Jake Miller', agency: 'Marsh McLennan Agency', location: 'DIA Terminal Expansion, Denver, CO', contactMet: 'Brian Foster (Superintendent)', purpose: 'Job Site Inspection', backlogDiscussed: false, financialsDiscussed: false, equipmentReviewed: true, safetyReviewed: true, overallImpression: 'Positive', followUpRequired: false, followUpDate: '', notes: 'DIA terminal project running smoothly. Excellent site organization. Safety protocols exceeded expectations. Project 65% complete.', branch: 'Cincinnati' },
    { account: 'Clark Construction Group', visitDate: '06/14/2023', visitType: 'In-Person', visitedBy: 'Jake Miller', agency: 'Aon Surety', location: 'Bethesda, MD - Corporate Office', contactMet: 'Peter Forster (VP Surety)', purpose: 'Annual Visit', backlogDiscussed: true, financialsDiscussed: true, equipmentReviewed: false, safetyReviewed: false, overallImpression: 'Positive', followUpRequired: false, followUpDate: '', notes: 'Annual visit — all metrics strong. Backlog at record levels. Discussed succession planning for key personnel.', branch: 'Cincinnati' },
    { account: 'Granite Construction Inc', visitDate: '05/20/2023', visitType: 'Virtual', visitedBy: 'Mike Torres', agency: 'Lockton Companies', location: 'Video Conference', contactMet: 'Susan Park (Treasury)', purpose: 'ARR Follow-Up', backlogDiscussed: false, financialsDiscussed: true, equipmentReviewed: false, safetyReviewed: false, overallImpression: 'Neutral', followUpRequired: true, followUpDate: '08/01/2023', notes: 'Reviewed Q1 financials. Margins tighter than expected on CalTrans projects. Treasury indicated short-term borrowing up. Follow up with updated cashflow projection.', branch: 'Sacramento' }
];

// ==================== PREMIUM AR BY AGENCY ====================
const samplePremiumAR = [
    { agency: 'Great American Surety', type: 'CARRIER_INVITED', current: 5001, d1_30: 34736, d31_60: 38622, d61_90: 32344, d90plus: 206350, invoices: 86 },
    { agency: 'Redstone Commercial Insurance', type: 'CARRIER_INVITED', current: 5500, d1_30: 0, d31_60: 8717, d61_90: 19239, d90plus: 88650, invoices: 55 },
    { agency: 'Silver Oak Insurance Brokers', type: 'CARRIER_INVITED', current: 16086, d1_30: 9134, d31_60: 12399, d61_90: 3109, d90plus: 78138, invoices: 61 },
    { agency: 'Granite Peak Bonding', type: 'CARRIER_INVITED', current: 4998, d1_30: 2353, d31_60: 2896, d61_90: 3498, d90plus: 98893, invoices: 52 },
    { agency: 'Hilltop Surety Co', type: 'CARRIER_INVITED', current: 500, d1_30: 12964, d31_60: 9740, d61_90: 5717, d90plus: 56384, invoices: 43 },
    { agency: 'Evergreen Bond & Insurance', type: 'CARRIER_INVITED', current: 2642, d1_30: 5000, d31_60: 975, d61_90: 500, d90plus: 30116, invoices: 26 }
];

// Premium AR Detail — account-level breakdown per agency (totals must match samplePremiumAR)
const samplePremiumARDetail = {
    'Great American Surety': [
        // current:5001, d1_30:34736, d31_60:38622, d61_90:32344, d90plus:206350, invoices:86
        { account: 'Hensel Phelps Construction Co', current: 2500, d1_30: 12000, d31_60: 15000, d61_90: 10000, d90plus: 85000, invoices: 22 },
        { account: 'Clark Construction Group', current: 1500, d1_30: 8736, d31_60: 10000, d61_90: 8344, d90plus: 52000, invoices: 18 },
        { account: 'McCarthy Building Companies', current: 501, d1_30: 6000, d31_60: 5622, d61_90: 7000, d90plus: 38350, invoices: 16 },
        { account: 'Brasfield & Gorrie LLC', current: 500, d1_30: 5000, d31_60: 4500, d61_90: 4000, d90plus: 18000, invoices: 15 },
        { account: 'Mortenson Construction', current: 0, d1_30: 3000, d31_60: 3500, d61_90: 3000, d90plus: 13000, invoices: 15 }
    ],
    'Redstone Commercial Insurance': [
        // current:5500, d1_30:0, d31_60:8717, d61_90:19239, d90plus:88650, invoices:55
        { account: 'Austin Industries', current: 2200, d1_30: 0, d31_60: 3500, d61_90: 8000, d90plus: 35000, invoices: 14 },
        { account: 'Granite Construction Inc', current: 1800, d1_30: 0, d31_60: 2717, d61_90: 5239, d90plus: 28650, invoices: 13 },
        { account: 'R.J. Corman Railroad Group', current: 1000, d1_30: 0, d31_60: 1500, d61_90: 3500, d90plus: 15000, invoices: 12 },
        { account: 'Traylor Bros Inc', current: 500, d1_30: 0, d31_60: 1000, d61_90: 2500, d90plus: 10000, invoices: 16 }
    ],
    'Silver Oak Insurance Brokers': [
        // current:16086, d1_30:9134, d31_60:12399, d61_90:3109, d90plus:78138, invoices:61
        { account: 'Hensel Phelps Construction Co', current: 6000, d1_30: 3134, d31_60: 4500, d61_90: 1200, d90plus: 30000, invoices: 15 },
        { account: 'McCarthy Building Companies', current: 4086, d1_30: 2500, d31_60: 3399, d61_90: 909, d90plus: 22138, invoices: 14 },
        { account: 'Cadell Construction Co', current: 3000, d1_30: 1500, d31_60: 2500, d61_90: 500, d90plus: 15000, invoices: 12 },
        { account: 'Primoris Services Corp', current: 2000, d1_30: 1000, d31_60: 1000, d61_90: 300, d90plus: 7000, invoices: 11 },
        { account: 'Austin Industries', current: 1000, d1_30: 1000, d31_60: 1000, d61_90: 200, d90plus: 4000, invoices: 9 }
    ],
    'Granite Peak Bonding': [
        // current:4998, d1_30:2353, d31_60:2896, d61_90:3498, d90plus:98893, invoices:52
        { account: 'Clark Construction Group', current: 2000, d1_30: 1000, d31_60: 1200, d61_90: 1500, d90plus: 42000, invoices: 14 },
        { account: 'Brasfield & Gorrie LLC', current: 1500, d1_30: 800, d31_60: 896, d61_90: 998, d90plus: 30893, invoices: 13 },
        { account: 'Mortenson Construction', current: 998, d1_30: 353, d31_60: 500, d61_90: 500, d90plus: 16000, invoices: 13 },
        { account: 'Granite Construction Inc', current: 500, d1_30: 200, d31_60: 300, d61_90: 500, d90plus: 10000, invoices: 12 }
    ],
    'Hilltop Surety Co': [
        // current:500, d1_30:12964, d31_60:9740, d61_90:5717, d90plus:56384, invoices:43
        { account: 'R.J. Corman Railroad Group', current: 200, d1_30: 5000, d31_60: 3500, d61_90: 2500, d90plus: 22000, invoices: 12 },
        { account: 'Cadell Construction Co', current: 200, d1_30: 4464, d31_60: 3240, d61_90: 1717, d90plus: 18384, invoices: 11 },
        { account: 'Traylor Bros Inc', current: 100, d1_30: 2000, d31_60: 1500, d61_90: 1000, d90plus: 10000, invoices: 10 },
        { account: 'Primoris Services Corp', current: 0, d1_30: 1500, d31_60: 1500, d61_90: 500, d90plus: 6000, invoices: 10 }
    ],
    'Evergreen Bond & Insurance': [
        // current:2642, d1_30:5000, d31_60:975, d61_90:500, d90plus:30116, invoices:26
        { account: 'Austin Industries', current: 1200, d1_30: 2500, d31_60: 475, d61_90: 300, d90plus: 14116, invoices: 10 },
        { account: 'Brasfield & Gorrie LLC', current: 942, d1_30: 1500, d31_60: 300, d61_90: 200, d90plus: 10000, invoices: 9 },
        { account: 'Mortenson Construction', current: 500, d1_30: 1000, d31_60: 200, d61_90: 0, d90plus: 6000, invoices: 7 }
    ]
};

// Premium AR Bond-Level Detail — bonds per agency|account (totals must match samplePremiumARDetail)
const samplePremiumARBonds = {
    // === Great American Surety ===
    'Great American Surety|Hensel Phelps Construction Co': [
        { bondNumber: '8921045', bondType: 'Performance', project: 'Denver Airport Terminal Expansion', current: 1500, d1_30: 7000, d31_60: 9000, d61_90: 6000, d90plus: 48000 },
        { bondNumber: '6901538', bondType: 'Payment Bond', project: 'Colorado Springs Med Center', current: 1000, d1_30: 5000, d31_60: 6000, d61_90: 4000, d90plus: 37000 }
    ],
    'Great American Surety|Clark Construction Group': [
        { bondNumber: 'F801457', bondType: 'Maintenance Bond', project: 'Bethesda Federal Complex', current: 800, d1_30: 4736, d31_60: 5500, d61_90: 4344, d90plus: 28000 },
        { bondNumber: '5331708', bondType: 'Performance & Payment', project: 'DC Metro Rail Extension', current: 700, d1_30: 4000, d31_60: 4500, d61_90: 4000, d90plus: 24000 }
    ],
    'Great American Surety|McCarthy Building Companies': [
        { bondNumber: '5014829', bondType: 'Performance', project: 'Phoenix Biotech Campus', current: 501, d1_30: 3500, d31_60: 3122, d61_90: 4000, d90plus: 22000 },
        { bondNumber: 'F910382', bondType: 'Bid Bond', project: 'Tucson Water Treatment Plant', current: 0, d1_30: 2500, d31_60: 2500, d61_90: 3000, d90plus: 16350 }
    ],
    'Great American Surety|Brasfield & Gorrie LLC': [
        { bondNumber: 'F465182', bondType: 'Bid Bond', project: 'Atlanta Midtown Tower', current: 300, d1_30: 3000, d31_60: 2500, d61_90: 2000, d90plus: 10000 },
        { bondNumber: '8750693', bondType: 'Performance', project: 'Nashville Convention Center', current: 200, d1_30: 2000, d31_60: 2000, d61_90: 2000, d90plus: 8000 }
    ],
    'Great American Surety|Mortenson Construction': [
        { bondNumber: '5209463', bondType: 'Bid Bond', project: 'Minneapolis Stadium Renovation', current: 0, d1_30: 1500, d31_60: 2000, d61_90: 1500, d90plus: 7000 },
        { bondNumber: '8601274', bondType: 'Performance', project: 'Iowa Data Center Complex', current: 0, d1_30: 1500, d31_60: 1500, d61_90: 1500, d90plus: 6000 }
    ],

    // === Redstone Commercial Insurance ===
    'Redstone Commercial Insurance|Austin Industries': [
        { bondNumber: '7780342', bondType: 'Performance & Payment', project: 'Dallas Tollway Expansion', current: 1200, d1_30: 0, d31_60: 2000, d61_90: 5000, d90plus: 20000 },
        { bondNumber: '5450291', bondType: 'Performance', project: 'Fort Worth ISD Schools', current: 1000, d1_30: 0, d31_60: 1500, d61_90: 3000, d90plus: 15000 }
    ],
    'Redstone Commercial Insurance|Granite Construction Inc': [
        { bondNumber: '7124603', bondType: 'Performance', project: 'I-35 Highway Widening', current: 1000, d1_30: 0, d31_60: 1500, d61_90: 3000, d90plus: 16000 },
        { bondNumber: 'F558034', bondType: 'Performance & Payment', project: 'Sacramento Bridge Rehab', current: 800, d1_30: 0, d31_60: 1217, d61_90: 2239, d90plus: 12650 }
    ],
    'Redstone Commercial Insurance|R.J. Corman Railroad Group': [
        { bondNumber: '4127935', bondType: 'Performance & Payment', project: 'Kentucky Rail Corridor', current: 600, d1_30: 0, d31_60: 800, d61_90: 2000, d90plus: 9000 },
        { bondNumber: '9206417', bondType: 'Performance', project: 'Indiana Rail Yard Expansion', current: 400, d1_30: 0, d31_60: 700, d61_90: 1500, d90plus: 6000 }
    ],
    'Redstone Commercial Insurance|Traylor Bros Inc': [
        { bondNumber: '5706182', bondType: 'Performance', project: 'Ohio River Tunnel Project', current: 300, d1_30: 0, d31_60: 600, d61_90: 1500, d90plus: 6000 },
        { bondNumber: '9357028', bondType: 'Bid Bond', project: 'Indiana DOT Bridge #4412', current: 200, d1_30: 0, d31_60: 400, d61_90: 1000, d90plus: 4000 }
    ],

    // === Silver Oak Insurance Brokers ===
    'Silver Oak Insurance Brokers|Hensel Phelps Construction Co': [
        { bondNumber: '6013547', bondType: 'Performance & Payment', project: 'LAX Terminal Modernization', current: 3500, d1_30: 1634, d31_60: 2500, d61_90: 700, d90plus: 18000 },
        { bondNumber: '9451603', bondType: 'Performance', project: 'UC San Diego Research Lab', current: 2500, d1_30: 1500, d31_60: 2000, d61_90: 500, d90plus: 12000 }
    ],
    'Silver Oak Insurance Brokers|McCarthy Building Companies': [
        { bondNumber: '6152903', bondType: 'Performance', project: 'Scottsdale Medical Plaza', current: 2086, d1_30: 1500, d31_60: 1899, d61_90: 509, d90plus: 12138 },
        { bondNumber: '9582714', bondType: 'Payment Bond', project: 'Mesa Unified School District', current: 2000, d1_30: 1000, d31_60: 1500, d61_90: 400, d90plus: 10000 }
    ],
    'Silver Oak Insurance Brokers|Cadell Construction Co': [
        { bondNumber: '6284710', bondType: 'Performance & Payment', project: 'Birmingham Steel Mill Upgrade', current: 1800, d1_30: 800, d31_60: 1500, d61_90: 300, d90plus: 9000 },
        { bondNumber: 'F970451', bondType: 'Performance', project: 'Huntsville Army Base Housing', current: 1200, d1_30: 700, d31_60: 1000, d61_90: 200, d90plus: 6000 }
    ],
    'Silver Oak Insurance Brokers|Primoris Services Corp': [
        { bondNumber: '6401358', bondType: 'Performance', project: 'SoCal Pipeline Replacement', current: 1200, d1_30: 600, d31_60: 600, d61_90: 200, d90plus: 4000 },
        { bondNumber: '9823160', bondType: 'Bid Bond', project: 'Nevada Solar Farm Phase II', current: 800, d1_30: 400, d31_60: 400, d61_90: 100, d90plus: 3000 }
    ],
    'Silver Oak Insurance Brokers|Austin Industries': [
        { bondNumber: 'F652049', bondType: 'Performance & Payment', project: 'San Antonio Highway 281', current: 600, d1_30: 600, d31_60: 600, d61_90: 120, d90plus: 2500 },
        { bondNumber: '9950847', bondType: 'Performance', project: 'Austin Water Main Replacement', current: 400, d1_30: 400, d31_60: 400, d61_90: 80, d90plus: 1500 }
    ],

    // === Granite Peak Bonding ===
    'Granite Peak Bonding|Clark Construction Group': [
        { bondNumber: '6653817', bondType: 'Performance & Payment', project: 'Virginia Tech Research Hall', current: 1200, d1_30: 600, d31_60: 700, d61_90: 800, d90plus: 24000 },
        { bondNumber: '1005293', bondType: 'Performance', project: 'Pentagon Annex Renovation', current: 800, d1_30: 400, d31_60: 500, d61_90: 700, d90plus: 18000 }
    ],
    'Granite Peak Bonding|Brasfield & Gorrie LLC': [
        { bondNumber: '6780294', bondType: 'Performance', project: 'Birmingham Hospital Wing', current: 900, d1_30: 500, d31_60: 500, d61_90: 598, d90plus: 18000 },
        { bondNumber: '1018764', bondType: 'Payment Bond', project: 'Mobile Port Terminal', current: 600, d1_30: 300, d31_60: 396, d61_90: 400, d90plus: 12893 }
    ],
    'Granite Peak Bonding|Mortenson Construction': [
        { bondNumber: '6905138', bondType: 'Performance & Payment', project: 'Milwaukee Arena Expansion', current: 598, d1_30: 200, d31_60: 300, d61_90: 300, d90plus: 10000 },
        { bondNumber: 'F103058', bondType: 'Bid Bond', project: 'St. Paul Office Complex', current: 400, d1_30: 153, d31_60: 200, d61_90: 200, d90plus: 6000 }
    ],
    'Granite Peak Bonding|Granite Construction Inc': [
        { bondNumber: '7023641', bondType: 'Performance', project: 'Oregon Coast Highway Repair', current: 300, d1_30: 120, d31_60: 180, d61_90: 300, d90plus: 6000 },
        { bondNumber: '1042395', bondType: 'Performance & Payment', project: 'Reno Airport Taxiway', current: 200, d1_30: 80, d31_60: 120, d61_90: 200, d90plus: 4000 }
    ],

    // === Hilltop Surety Co ===
    'Hilltop Surety Co|R.J. Corman Railroad Group': [
        { bondNumber: '7158204', bondType: 'Performance', project: 'Tennessee Rail Siding Project', current: 120, d1_30: 3000, d31_60: 2000, d61_90: 1500, d90plus: 13000 },
        { bondNumber: '1055821', bondType: 'Performance & Payment', project: 'Georgia Short Line Rehab', current: 80, d1_30: 2000, d31_60: 1500, d61_90: 1000, d90plus: 9000 }
    ],
    'Hilltop Surety Co|Cadell Construction Co': [
        { bondNumber: 'F728061', bondType: 'Performance', project: 'Alabama DOT Interstate Work', current: 120, d1_30: 2464, d31_60: 1740, d61_90: 1000, d90plus: 10384 },
        { bondNumber: '1068437', bondType: 'Bid Bond', project: 'Montgomery Courthouse Annex', current: 80, d1_30: 2000, d31_60: 1500, d61_90: 717, d90plus: 8000 }
    ],
    'Hilltop Surety Co|Traylor Bros Inc': [
        { bondNumber: '7402583', bondType: 'Performance & Payment', project: 'Chicago Deep Tunnel Phase V', current: 60, d1_30: 1200, d31_60: 900, d61_90: 600, d90plus: 6000 },
        { bondNumber: '1080952', bondType: 'Performance', project: 'Indiana Levee Reinforcement', current: 40, d1_30: 800, d31_60: 600, d61_90: 400, d90plus: 4000 }
    ],
    'Hilltop Surety Co|Primoris Services Corp': [
        { bondNumber: '7520946', bondType: 'Performance', project: 'Texas Pipeline Crossing', current: 0, d1_30: 900, d31_60: 900, d61_90: 300, d90plus: 3500 },
        { bondNumber: 'F109263', bondType: 'Bid Bond', project: 'Louisiana Refinery Access Road', current: 0, d1_30: 600, d31_60: 600, d61_90: 200, d90plus: 2500 }
    ],

    // === Evergreen Bond & Insurance ===
    'Evergreen Bond & Insurance|Austin Industries': [
        { bondNumber: '7651302', bondType: 'Performance & Payment', project: 'Houston Ship Channel Bridge', current: 700, d1_30: 1500, d31_60: 275, d61_90: 180, d90plus: 8116 },
        { bondNumber: '1105748', bondType: 'Performance', project: 'Corpus Christi Desalination', current: 500, d1_30: 1000, d31_60: 200, d61_90: 120, d90plus: 6000 }
    ],
    'Evergreen Bond & Insurance|Brasfield & Gorrie LLC': [
        { bondNumber: '7784019', bondType: 'Performance', project: 'Tampa General Hospital Expansion', current: 542, d1_30: 900, d31_60: 180, d61_90: 120, d90plus: 6000 },
        { bondNumber: '1118206', bondType: 'Payment Bond', project: 'Jacksonville Riverwalk Phase III', current: 400, d1_30: 600, d31_60: 120, d61_90: 80, d90plus: 4000 }
    ],
    'Evergreen Bond & Insurance|Mortenson Construction': [
        { bondNumber: '7903654', bondType: 'Performance & Payment', project: 'Denver Tech Center Office', current: 300, d1_30: 600, d31_60: 120, d61_90: 0, d90plus: 3500 },
        { bondNumber: '1130594', bondType: 'Bid Bond', project: 'Boulder County Rec Center', current: 200, d1_30: 400, d31_60: 80, d61_90: 0, d90plus: 2500 }
    ]
};

// AR Detail Sections Data
const arSections = [
    { id: 'ar-info', label: 'Account Review Info / Sign-Off History', complete: false },
    { id: 'background', label: 'Background & Experience', complete: true },
    { id: 'operations', label: 'Operations', complete: true },
    { id: 'work-on-hand', label: 'Work on Hand', complete: false },
    { id: 'key-personnel', label: 'Key Personnel', complete: false },
    { id: 'indemnitors', label: 'Indemnitors', complete: false },
    { id: 'affiliates', label: 'Affiliates', complete: false },
    { id: 'credit', label: 'Credit', complete: true },
    { id: 'bank-lines', label: 'Bank Lines', complete: false },
    { id: 'financial-summary', label: 'Financial Summary / Red Flags', complete: false },
    { id: 'risks-recs', label: 'Risks / Reqs. / Recommendations', complete: false },
    { id: 'sign-off', label: 'Sign-Off and Promote Review', complete: false }
];

// ==================== ACCOUNT PROFILES (BR-4, BR-5) ====================

const accountProfiles = {
    'Hensel Phelps Construction Co': {
        authorityLevel: 'Region',
        arrFrequency: 'Semi-Annual',
        frequencyOverride: null,
        lastAnnualCPADate: '12/31/2023',
        lastInterimDate: '06/30/2023'
    },
    'Clark Construction Group': {
        authorityLevel: 'CAO',
        arrFrequency: 'Quarterly',
        frequencyOverride: {
            newFrequency: 'Semi-Annual',
            approver: 'John Webster',
            approvalDate: '01/15/2024',
            rationale: 'Stable financials and long-standing relationship justify reduced frequency'
        },
        lastAnnualCPADate: '12/31/2023',
        lastInterimDate: null
    },
    'Turner Construction Company': {
        authorityLevel: 'Region',
        arrFrequency: 'Semi-Annual',
        frequencyOverride: null,
        lastAnnualCPADate: '12/31/2022',
        lastInterimDate: '06/30/2023'
    },
    'R.J. Corman Railroad Group': {
        authorityLevel: 'Branch',
        arrFrequency: 'Annual',
        frequencyOverride: null,
        lastAnnualCPADate: '12/31/2021',
        lastInterimDate: null
    },
    'Granite Construction Inc': {
        authorityLevel: 'Region',
        arrFrequency: 'Semi-Annual',
        frequencyOverride: {
            newFrequency: 'Quarterly',
            approver: 'Max Miller',
            approvalDate: '11/20/2023',
            rationale: 'Declining backlog and margin compression warrant closer monitoring'
        },
        lastAnnualCPADate: '12/31/2020',
        lastInterimDate: null
    },
    'Whiting-Turner Contracting': {
        authorityLevel: 'Branch',
        arrFrequency: 'Annual',
        frequencyOverride: null,
        lastAnnualCPADate: null,
        lastInterimDate: null
    }
};

// ==================== REVIEW CHAIN OF COMMAND ====================

const reviewChains = {
    'Jake Miller': ['Max Miller', 'John Webster', 'Ken Bearley'],
    'Sarah Mitchell': ['Amy Rodriguez', 'John Webster', 'Ken Bearley'],
    'Mike Torres': ['Jake Miller', 'Max Miller', 'John Webster', 'Ken Bearley']
};

const chainTitles = {
    'Chris Watson': 'Admin',
    'Geoff Smith': 'Admin',
    'Sarah Mitchell': 'Sr. Underwriter',
    'Mike Torres': 'Underwriter',
    'Jake Miller': 'Branch Manager',
    'Max Miller': 'Regional Manager',
    'Amy Rodriguez': 'Regional Manager',
    'John Webster': 'VP Underwriting',
    'Ken Bearley': 'President'
};

// ==================== CHAT & NOTES DATA ====================

const sampleUsers = [
    { name: 'Sarah Mitchell', role: 'Sr. Underwriter', avatar: 'SM' },
    { name: 'Mike Torres', role: 'Underwriter', avatar: 'MT' },
    { name: 'Lisa Chen', role: 'Bond Analyst', avatar: 'LC' },
    { name: 'James Park', role: 'Claims Manager', avatar: 'JP' },
    { name: 'Amy Rodriguez', role: 'Regional Manager', avatar: 'AR' }
];

const currentUser = { name: 'Jake Miller', role: 'Branch Manager', avatar: 'JM' };

// ==================== GRADE SCALE UTILITIES ====================
// Grades: A+, A, A-, B+, B, B-, C+, C, C- (no D)
const ALL_GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'];

function getGradeGroup(grade) {
    if (!grade) return 'C';
    return grade.charAt(0); // 'A', 'B', or 'C'
}

function getGradeColor(grade) {
    const g = getGradeGroup(grade);
    if (g === 'A') return 'var(--accent-green)';
    if (g === 'B') return 'var(--accent-blue)';
    return 'var(--accent-orange)';
}

function getGradeColorName(grade) {
    const g = getGradeGroup(grade);
    if (g === 'A') return 'green';
    if (g === 'B') return 'blue';
    return 'orange';
}

function getGradeCssClass(grade) {
    const g = getGradeGroup(grade);
    if (g === 'A') return 'status-approved';
    if (g === 'B') return 'status-pending';
    return 'status-uw-review';
}

// ==================== LOA STATUS UTILITY ====================
// Computes LOA status from expDate — if expDate is in the past, status is always 'Expired'
function getLOAStatus(loa) {
    const exp = new Date(loa.expDate);
    const now = new Date();
    // Zero out time components for date-only comparison
    now.setHours(0, 0, 0, 0);
    exp.setHours(0, 0, 0, 0);
    if (exp < now) return 'Expired';
    return loa.status || 'Active';
}

// ==================== TERRITORY & ACCESS CONTROL ====================

const ADMIN_USERS = ['Ken Bearley', 'Chris Watson', 'Geoff Smith'];

const sampleTerritories = [
    { name: 'Cincinnati', assignee: 'Jake Miller', states: ['OH', 'IN', 'WV', 'PA'] },
    { name: 'Great Lakes', assignee: 'Sarah Mitchell', states: ['MI', 'WI', 'IL', 'MN'] },
    { name: 'Plains', assignee: 'Mike Torres', states: ['ND', 'SD', 'NE', 'KS', 'IA', 'MO'] },
    { name: 'Southeast', assignee: 'Amy Rodriguez', states: ['NC', 'SC', 'GA', 'FL', 'TN', 'VA', 'KY'] },
    { name: 'Gulf Coast', assignee: 'Max Miller', states: ['TX', 'OK', 'LA', 'MS', 'AL', 'AR'] },
    { name: 'Mountain', assignee: 'Lisa Chen', states: ['NV', 'UT', 'CO', 'AZ', 'NM'] },
    { name: 'Northwest', assignee: 'James Park', states: ['MT', 'ID', 'WY'] },
    { name: 'Pacific', assignee: 'John Webster', states: ['WA', 'OR', 'CA', 'HI', 'AK'] },
    { name: 'Mid-Atlantic', assignee: 'Tom Bradley', states: ['NJ', 'DE', 'MD', 'DC'] },
    { name: 'Northeast', assignee: 'Rachel Adams', states: ['NY', 'CT', 'RI', 'MA', 'VT', 'NH', 'ME'] }
];

function canSeeAllTerritories() {
    return ADMIN_USERS.includes(currentUser.name) ||
        ['President', 'Admin', 'VP Underwriting', 'CAO', 'Regional Manager'].includes(currentUser.role) ||
        ['President', 'Admin', 'VP Underwriting', 'CAO', 'Regional Manager'].includes(chainTitles[currentUser.name]);
}

function getUserTerritory() {
    return sampleTerritories.find(t => t.assignee === currentUser.name) || null;
}

function getUserTerritoryStates() {
    if (canSeeAllTerritories()) return null; // null means "all states"
    const territory = getUserTerritory();
    return territory ? territory.states : [];
}

// ==================== DASHBOARD PREFERENCES ====================

const DASHBOARD_DEFAULTS = {
    panels: [
        { id: 'kpi-cards', label: 'KPI Summary Cards', visible: true, order: 0 },
        { id: 'week-glance', label: 'This Week\'s Bids & Reminders', visible: true, order: 1 },
        { id: 'action-items', label: 'Action Items', visible: true, order: 2 },
        { id: 'arr-list', label: 'My Account Review Reports', visible: true, order: 3 },
        { id: 'bond-requests', label: 'My Bond Requests', visible: true, order: 4 }
    ],
    config: {
        actionItemsMaxCount: 10,
        arrListMaxCount: 5,
        bondRequestsMaxCount: 3,
        kpiCardsVisible: ['arrs', 'bonds', 'watchlist', 'loa', 'fs']
    }
};

function getDashboardPrefs() {
    try {
        const key = 'bondbox-dashboard-' + currentUser.name.replace(/\s/g, '_');
        const stored = localStorage.getItem(key);
        if (stored) {
            const prefs = JSON.parse(stored);
            // Ensure all panel IDs exist (handles upgrades if new panels added)
            const storedIds = prefs.panels.map(p => p.id);
            DASHBOARD_DEFAULTS.panels.forEach(dp => {
                if (!storedIds.includes(dp.id)) {
                    prefs.panels.push({ ...dp, order: prefs.panels.length });
                }
            });
            // Ensure config keys exist
            Object.keys(DASHBOARD_DEFAULTS.config).forEach(k => {
                if (prefs.config[k] === undefined) prefs.config[k] = DASHBOARD_DEFAULTS.config[k];
            });
            return prefs;
        }
    } catch (e) { /* ignore parse errors */ }
    return JSON.parse(JSON.stringify(DASHBOARD_DEFAULTS));
}

function saveDashboardPrefs(prefs) {
    try {
        const key = 'bondbox-dashboard-' + currentUser.name.replace(/\s/g, '_');
        localStorage.setItem(key, JSON.stringify(prefs));
    } catch (e) { /* ignore storage errors */ }
}

function resetDashboardPrefs() {
    try {
        const key = 'bondbox-dashboard-' + currentUser.name.replace(/\s/g, '_');
        localStorage.removeItem(key);
    } catch (e) { /* ignore */ }
}

const MANAGER_ROLES = ['Branch Manager', 'Regional Manager', 'VP Underwriting', 'CAO'];
function isManagerRole() {
    return MANAGER_ROLES.includes(currentUser.role) || MANAGER_ROLES.includes(chainTitles[currentUser.name]);
}

// ==================== WIDGET REGISTRY & DASHBOARD LAYOUT ====================

const WIDGET_REGISTRY = {
    'kpi-cards': {
        label: 'KPI Summary Cards',
        render: function(container) {
            container.innerHTML = `<div class="kpi-grid kpi-grid-4">
                <div class="kpi-card clickable" onclick="navigateTo('account-review')"><div class="kpi-header"><span class="kpi-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span><span class="kpi-title">ARRs Due / Overdue</span></div><div class="kpi-value">0</div></div>
                <div class="kpi-card clickable" onclick="navigateTo('bond-requests'); filterBondRequests('all', document.querySelector('#bond-requests-tabs .tab[data-filter=&quot;all&quot;]'));"><div class="kpi-header"><span class="kpi-icon green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span><span class="kpi-title">Bond Requests Pending</span></div><div class="kpi-value">0</div></div>
                <div class="kpi-card clickable" onclick="navigateTo('account-review')"><div class="kpi-header"><span class="kpi-icon red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span><span class="kpi-title">Watchlist Accounts</span></div><div class="kpi-value">0</div></div>
                <div class="kpi-card clickable" onclick="navigateTo('loa'); filterLOAView('Expiring', document.querySelector('#loa-tabs .tab:nth-child(3)'));"><div class="kpi-header"><span class="kpi-icon orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span><span class="kpi-title">Expiring LOAs (30 Days)</span></div><div class="kpi-value">0</div></div>
                <div class="kpi-card clickable" onclick="openFSComplianceModal()"><div class="kpi-header"><span class="kpi-icon purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span><span class="kpi-title">FS Compliance Issues</span></div><div class="kpi-value" id="kpi-fs-compliance">0</div></div>
            </div>`;
        },
        postRender: function() { updateKPIValues(); }
    },
    'week-glance': {
        label: "This Week's Bids & Reminders",
        render: function(container) {
            container.innerHTML = `<div class="uw-split-row">
                <div class="uw-panel">
                    <h2 class="uw-panel-title">This Week's Bids & Reminders</h2>
                    <div id="home-week-bids"></div>
                    <div id="home-week-reminders"></div>
                </div>
                <div class="uw-panel uw-panel-wide">
                    <h2 class="uw-panel-title">Action Items</h2>
                    <div id="home-action-items" class="action-items-list"></div>
                </div>
            </div>`;
        },
        postRender: function() { renderWeekAtGlance(); renderActionItems(); }
    },
    'action-items': {
        label: 'Action Items',
        render: function() { /* rendered as part of week-glance split row */ },
        postRender: function() { /* handled by week-glance postRender */ },
        linkedTo: 'week-glance'
    },
    'arr-list': {
        label: 'My Account Review Reports',
        render: function(container) {
            container.innerHTML = `<div class="uw-panel uw-panel-full"><h2 class="uw-panel-title">My Account Review Reports</h2><div class="arr-list" id="arr-list"></div></div>`;
        },
        postRender: function() { renderARRList(); }
    },
    'bond-requests': {
        label: 'My Bond Requests',
        render: function(container) {
            container.innerHTML = `<div class="uw-panel uw-panel-full"><h2 class="uw-panel-title">My Bond Requests</h2><div class="bond-requests-list" id="bond-requests-list"></div></div>`;
        },
        postRender: function() {
            var maxBond = 3;
            try { maxBond = getDashboardPrefs().config.bondRequestsMaxCount || 3; } catch(e) {}
            var myBonds = sampleBondRequests.filter(b => b.assignee === currentUser.name).slice(0, maxBond);
            renderBondRequests('bond-requests-list', myBonds);
            if (sampleBondRequests.filter(b => b.assignee === currentUser.name).length > maxBond) {
                var c = document.getElementById('bond-requests-list');
                if (c) c.innerHTML += '<div style="text-align:center;padding:8px;color:#6b7280;font-size:12px;">Showing ' + maxBond + ' of ' + sampleBondRequests.filter(b => b.assignee === currentUser.name).length + ' requests &mdash; <a href="#" onclick="event.preventDefault();openDashboardSettings();" style="color:var(--accent-brand);">change limit</a></div>';
            }
        }
    }
};

function renderDashboardLayout() {
    const container = document.getElementById('dashboard-widgets');
    if (!container) return;

    var prefs;
    try {
        prefs = getDashboardPrefs();
    } catch (e) {
        console.error('renderDashboardLayout: failed to load prefs', e);
        prefs = JSON.parse(JSON.stringify(DASHBOARD_DEFAULTS));
    }

    // Sort panels by order
    const sortedPanels = prefs.panels
        .filter(p => p.visible)
        .sort((a, b) => a.order - b.order);

    // Clear existing content
    container.innerHTML = '';

    // Handle week-glance + action-items as a linked pair
    const weekGlanceVisible = sortedPanels.some(p => p.id === 'week-glance');
    const actionItemsVisible = sortedPanels.some(p => p.id === 'action-items');

    sortedPanels.forEach(panel => {
        try {
            const widget = WIDGET_REGISTRY[panel.id];
            if (!widget) return;

            // Skip action-items as standalone — it's rendered inside week-glance split row
            if (panel.id === 'action-items' && weekGlanceVisible) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'dashboard-widget';
            wrapper.setAttribute('data-widget-id', panel.id);

            if (panel.id === 'week-glance' && !actionItemsVisible) {
                wrapper.innerHTML = `<div class="uw-panel uw-panel-full">
                    <h2 class="uw-panel-title">This Week's Bids & Reminders</h2>
                    <div id="home-week-bids"></div>
                    <div id="home-week-reminders"></div>
                </div>`;
                container.appendChild(wrapper);
                try { renderWeekAtGlance(); } catch (e2) { console.error('renderWeekAtGlance error:', e2); }
                return;
            }

            if (panel.id === 'action-items' && !weekGlanceVisible) {
                wrapper.innerHTML = `<div class="uw-panel uw-panel-full">
                    <h2 class="uw-panel-title">Action Items</h2>
                    <div id="home-action-items" class="action-items-list"></div>
                </div>`;
                container.appendChild(wrapper);
                try { renderActionItems(); } catch (e2) { console.error('renderActionItems error:', e2); }
                return;
            }

            container.appendChild(wrapper);
            widget.render(wrapper);
        } catch (e) {
            console.error('renderDashboardLayout: widget render error for panel ' + panel.id, e);
        }
    });

    // Post-render passes
    sortedPanels.forEach(panel => {
        try {
            const widget = WIDGET_REGISTRY[panel.id];
            if (!widget || !widget.postRender) return;
            if (panel.id === 'action-items' && weekGlanceVisible) return;
            if (panel.id === 'week-glance' && !actionItemsVisible) return;
            if (panel.id === 'action-items' && !weekGlanceVisible) return;
            widget.postRender();
        } catch (e) {
            console.error('renderDashboardLayout: postRender error for panel ' + panel.id, e);
        }
    });
}

function openDashboardSettings() {
    var prefs = getDashboardPrefs();
    _dashSettingsOrder = prefs.panels.slice().sort(function(a, b) { return a.order - b.order; });
    var sorted = _dashSettingsOrder;

    var body = '<div style="margin-bottom:16px;color:#6b7280;font-size:13px;">Toggle panels on or off, reorder them with arrows, and configure content limits.</div>';

    // Panel visibility & reorder
    body += '<div style="margin-bottom:20px;"><h3 style="font-size:14px;font-weight:600;margin-bottom:10px;color:#374151;">Dashboard Panels</h3>';
    body += '<div id="dash-settings-panels">';
    sorted.forEach(function(p, i) {
        var w = WIDGET_REGISTRY[p.id];
        var label = w ? w.label : p.label || p.id;
        body += '<div class="dash-settings-row" data-panel-id="' + p.id + '" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:6px;background:#fff;">';
        body += '<label style="display:flex;align-items:center;gap:8px;flex:1;cursor:pointer;font-size:13px;color:#374151;">';
        body += '<input type="checkbox" ' + (p.visible ? 'checked' : '') + ' onchange="toggleDashPanel(\'' + p.id + '\', this.checked)" style="width:16px;height:16px;accent-color:var(--accent-brand);">';
        body += '<span style="font-weight:500;">' + label + '</span></label>';
        body += '<div style="display:flex;gap:4px;">';
        body += '<button class="btn btn-outline btn-sm" onclick="moveDashPanel(\'' + p.id + '\',-1)" title="Move up" style="padding:2px 6px;font-size:14px;"' + (i === 0 ? ' disabled' : '') + '>&#9650;</button>';
        body += '<button class="btn btn-outline btn-sm" onclick="moveDashPanel(\'' + p.id + '\',1)" title="Move down" style="padding:2px 6px;font-size:14px;"' + (i === sorted.length - 1 ? ' disabled' : '') + '>&#9660;</button>';
        body += '</div></div>';
    });
    body += '</div></div>';

    // Content filters
    body += '<div style="margin-bottom:20px;"><h3 style="font-size:14px;font-weight:600;margin-bottom:10px;color:#374151;">Content Limits</h3>';
    body += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
    body += '<div class="form-group"><label class="form-label" style="font-size:12px;">Max Action Items</label>';
    body += '<select id="dash-cfg-actionMax" class="form-select" style="font-size:13px;">';
    [5, 10, 15, 20, 50].forEach(function(n) {
        body += '<option value="' + n + '"' + (prefs.config.actionItemsMaxCount === n ? ' selected' : '') + '>' + n + '</option>';
    });
    body += '</select></div>';
    body += '<div class="form-group"><label class="form-label" style="font-size:12px;">Max Account Reviews</label>';
    body += '<select id="dash-cfg-arrMax" class="form-select" style="font-size:13px;">';
    [3, 5, 10, 15, 25].forEach(function(n) {
        body += '<option value="' + n + '"' + (prefs.config.arrListMaxCount === n ? ' selected' : '') + '>' + n + '</option>';
    });
    body += '</select></div>';
    body += '<div class="form-group"><label class="form-label" style="font-size:12px;">Max Bond Requests</label>';
    body += '<select id="dash-cfg-bondMax" class="form-select" style="font-size:13px;">';
    [3, 5, 10, 15, 25].forEach(function(n) {
        body += '<option value="' + n + '"' + (prefs.config.bondRequestsMaxCount === n ? ' selected' : '') + '>' + n + '</option>';
    });
    body += '</select></div>';
    body += '</div></div>';

    // Manager-only placeholder
    if (isManagerRole()) {
        body += '<div style="margin-bottom:12px;"><h3 style="font-size:14px;font-weight:600;margin-bottom:10px;color:#374151;">Manager Settings</h3>';
        body += '<div style="padding:16px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;color:#0369a1;font-size:13px;">Manager-specific customization options coming soon. These will include team-wide dashboard defaults, shared KPI targets, and escalation thresholds.</div></div>';
    }

    var footer = '<button class="btn btn-outline" onclick="resetDashboardAndClose()" style="margin-right:auto;">Reset to Defaults</button>';
    footer += '<button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>';
    footer += '<button class="btn btn-primary" onclick="applyDashboardSettings()">Apply Changes</button>';

    openModal('Customize Dashboard', body, footer);
    var mc = document.querySelector('.modal-container');
    if (mc) mc.style.maxWidth = '560px';
}

// Temp state for settings panel reorder
var _dashSettingsOrder = null;

function _getDashSettingsState() {
    if (!_dashSettingsOrder) {
        var prefs = getDashboardPrefs();
        _dashSettingsOrder = prefs.panels.slice().sort(function(a, b) { return a.order - b.order; });
    }
    return _dashSettingsOrder;
}

function toggleDashPanel(panelId, checked) {
    var panels = _getDashSettingsState();
    var p = panels.find(function(x) { return x.id === panelId; });
    if (p) p.visible = checked;
}

function moveDashPanel(panelId, direction) {
    var panels = _getDashSettingsState();
    var idx = panels.findIndex(function(x) { return x.id === panelId; });
    if (idx < 0) return;
    var newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= panels.length) return;
    // Swap
    var tmp = panels[idx];
    panels[idx] = panels[newIdx];
    panels[newIdx] = tmp;
    // Update order values
    panels.forEach(function(p, i) { p.order = i; });
    // Re-render the panel list inside the modal
    _rerenderSettingsPanels();
}

function _rerenderSettingsPanels() {
    var panels = _getDashSettingsState();
    var container = document.getElementById('dash-settings-panels');
    if (!container) return;
    var html = '';
    panels.forEach(function(p, i) {
        var w = WIDGET_REGISTRY[p.id];
        var label = w ? w.label : p.label || p.id;
        html += '<div class="dash-settings-row" data-panel-id="' + p.id + '" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:6px;background:#fff;">';
        html += '<label style="display:flex;align-items:center;gap:8px;flex:1;cursor:pointer;font-size:13px;color:#374151;">';
        html += '<input type="checkbox" ' + (p.visible ? 'checked' : '') + ' onchange="toggleDashPanel(\'' + p.id + '\', this.checked)" style="width:16px;height:16px;accent-color:var(--accent-brand);">';
        html += '<span style="font-weight:500;">' + label + '</span></label>';
        html += '<div style="display:flex;gap:4px;">';
        html += '<button class="btn btn-outline btn-sm" onclick="moveDashPanel(\'' + p.id + '\',-1)" title="Move up" style="padding:2px 6px;font-size:14px;"' + (i === 0 ? ' disabled' : '') + '>&#9650;</button>';
        html += '<button class="btn btn-outline btn-sm" onclick="moveDashPanel(\'' + p.id + '\',1)" title="Move down" style="padding:2px 6px;font-size:14px;"' + (i === panels.length - 1 ? ' disabled' : '') + '>&#9660;</button>';
        html += '</div></div>';
    });
    container.innerHTML = html;
}

function applyDashboardSettings() {
    try {
        var panels = _getDashSettingsState();
        if (!panels || !panels.length) {
            console.error('applyDashboardSettings: no panel state found');
            _dashSettingsOrder = null;
            closeAllModals();
            renderDashboardLayout();
            return;
        }

        var prefs = getDashboardPrefs();

        // Apply panel visibility and order
        prefs.panels = panels.map(function(p, i) {
            return { id: p.id, label: p.label || (WIDGET_REGISTRY[p.id] ? WIDGET_REGISTRY[p.id].label : p.id), visible: p.visible, order: i };
        });

        // Apply content config
        var actionMax = document.getElementById('dash-cfg-actionMax');
        if (actionMax) prefs.config.actionItemsMaxCount = parseInt(actionMax.value, 10);
        var arrMax = document.getElementById('dash-cfg-arrMax');
        if (arrMax) prefs.config.arrListMaxCount = parseInt(arrMax.value, 10);
        var bondMax = document.getElementById('dash-cfg-bondMax');
        if (bondMax) prefs.config.bondRequestsMaxCount = parseInt(bondMax.value, 10);

        saveDashboardPrefs(prefs);
    } catch (e) {
        console.error('applyDashboardSettings: error saving preferences', e);
    }
    _dashSettingsOrder = null;
    closeAllModals();
    renderDashboardLayout();
}

function resetDashboardAndClose() {
    resetDashboardPrefs();
    _dashSettingsOrder = null;
    closeAllModals();
    renderDashboardLayout();
}

const sampleConversations = [
    {
        with: 'Sarah Mitchell',
        unread: 2,
        messages: [
            { from: 'Sarah Mitchell', text: 'Hey Doug, did you get a chance to review the Turner Construction financials?', time: 'Apr 18, 2024 9:15 AM' },
            { from: 'Jake Miller', text: 'Yes, I looked at the 12/31 statements. The debt-to-equity ratio is a bit high but within our tolerance.', time: 'Apr 18, 2024 9:32 AM' },
            { from: 'Sarah Mitchell', text: 'Good. Can you also check the WIP schedule? I noticed some overbilling on the I-75 project.', time: 'Apr 18, 2024 9:45 AM' },
            { from: 'Sarah Mitchell', text: 'Also, the LOA renewal for Corman is coming up — we need to discuss the aggregate limit.', time: 'Apr 18, 2024 10:02 AM' }
        ]
    },
    {
        with: 'Mike Torres',
        unread: 0,
        messages: [
            { from: 'Jake Miller', text: 'Mike, can you handle the Corman maintenance bond request? I have the Clark P&P to review.', time: 'Apr 17, 2024 2:10 PM' },
            { from: 'Mike Torres', text: 'Sure, I\'ll pick it up. What\'s the bond amount?', time: 'Apr 17, 2024 2:22 PM' },
            { from: 'Jake Miller', text: '$750K — CSX Transportation is the obligee. Draft is in the system already.', time: 'Apr 17, 2024 2:30 PM' },
            { from: 'Mike Torres', text: 'Got it. I\'ll have it ready for review by EOD.', time: 'Apr 17, 2024 2:35 PM' }
        ]
    },
    {
        with: 'Lisa Chen',
        unread: 1,
        messages: [
            { from: 'Lisa Chen', text: 'Doug, I finished the exposure analysis for Q1. Total surety exposure is up 12% YoY.', time: 'Apr 16, 2024 4:00 PM' },
            { from: 'Jake Miller', text: 'Thanks Lisa. Can you break that down by region? I want to see where the growth is concentrated.', time: 'Apr 16, 2024 4:15 PM' },
            { from: 'Lisa Chen', text: 'Northeast accounts for 45% of the increase. I\'ll send the full breakdown tomorrow.', time: 'Apr 16, 2024 4:30 PM' }
        ]
    },
    {
        with: 'James Park',
        unread: 0,
        messages: [
            { from: 'James Park', text: 'FYI — the Granite Construction claim (CL-2024-0087) investigation is progressing. SubCo provided additional documentation.', time: 'Apr 15, 2024 11:00 AM' },
            { from: 'Jake Miller', text: 'What\'s the updated reserve estimate?', time: 'Apr 15, 2024 11:20 AM' },
            { from: 'James Park', text: 'Still at $245K. We may be able to negotiate down once we review the subcontract terms.', time: 'Apr 15, 2024 11:35 AM' }
        ]
    },
    {
        with: 'Amy Rodriguez',
        unread: 0,
        messages: [
            { from: 'Amy Rodriguez', text: 'Doug, the quarterly review meeting is set for next Friday. Please have the ARR summaries ready.', time: 'Apr 12, 2024 3:00 PM' },
            { from: 'Jake Miller', text: 'Will do. I have Corman and Turner reviews in progress — should be done by Wednesday.', time: 'Apr 12, 2024 3:15 PM' }
        ]
    }
];

let activeConversationIdx = null;

const sampleAccountNotes = {
    'R.J. Corman Railroad Group': [
        { author: 'Jake Miller', date: 'Apr 18, 2024 10:30 AM', text: 'LOA renewal discussion needed — current aggregate at $15M. Consider increasing to $20M based on backlog growth.', pinned: true },
        { author: 'Sarah Mitchell', date: 'Apr 15, 2024 2:00 PM', text: 'WIP schedule is 30 days overdue. Contacted agent for updated schedule.', pinned: false },
        { author: 'Mike Torres', date: 'Apr 10, 2024 9:00 AM', text: 'Maintenance bond request submitted for CSX Transportation project — $750K.', pinned: false }
    ],
    'Turner Construction Company': [
        { author: 'Sarah Mitchell', date: 'Apr 17, 2024 3:00 PM', text: 'Interim review flagged high WIP concentration — top 3 jobs represent 78% of backlog.', pinned: true },
        { author: 'Jake Miller', date: 'Apr 14, 2024 11:00 AM', text: 'Bid bond request for NYC DOT project under review. $850K — Sarah Mitchell assigned.', pinned: false }
    ],
    'Hensel Phelps Construction Co': [
        { author: 'Jake Miller', date: 'Apr 16, 2024 1:00 PM', text: 'New bid bond request — $2.4M highway project for CDOT. Financials look strong.', pinned: false },
        { author: 'Lisa Chen', date: 'Apr 10, 2024 4:30 PM', text: 'Exposure analysis complete. Total bonded exposure: $12.8M against $15M aggregate.', pinned: false }
    ],
    'Clark Construction Group': [
        { author: 'Jake Miller', date: 'Apr 16, 2024 9:00 AM', text: 'P&P bond $5.2M for US Army Corps awaiting approval. Within DOA limits at branch level.', pinned: true },
        { author: 'James Park', date: 'Apr 5, 2024 2:00 PM', text: 'Metro Plumbing claim (CL-2023-0092) closed. No loss to surety.', pinned: false }
    ],
    'Granite Construction Inc': [
        { author: 'James Park', date: 'Apr 15, 2024 11:45 AM', text: 'Active claim CL-2024-0087 — SubCo Materials LLC. Reserve: $245K. Investigation ongoing.', pinned: true },
        { author: 'Jake Miller', date: 'Apr 8, 2024 10:00 AM', text: 'Financial statement still pending CPA review since Feb 2024. Following up with agent.', pinned: false }
    ]
};

let activeAccountNote = null;

// ==================== UTILITY FUNCTIONS ====================

function fmt(n) {
    if (n === undefined || n === null) return '-';
    return '$' + n.toLocaleString('en-US');
}

function statusClass(s) {
    return s.toLowerCase().replace(/\s+/g, '-');
}

function daysInQueue(dateStr) {
    if (!dateStr) return null;
    const ref = new Date(2024, 3, 15); // April 15, 2024 — reference "today"
    const entered = new Date(dateStr);
    const diff = Math.floor((ref - entered) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
}

function queueAgeHTML(dateStr) {
    const days = daysInQueue(dateStr);
    if (days === null) return '';
    let cls = 'queue-age-green';
    if (days >= 8) cls = 'queue-age-red';
    else if (days >= 4) cls = 'queue-age-orange';
    const label = days === 0 ? 'Today' : days === 1 ? '1 day' : days + ' days';
    return ` <span class="queue-age ${cls}">${label}</span>`;
}

// ==================== RULES HELPERS (BR-1 through BR-6, FR-3) ====================

// FR-3: ARR due date = FS date received + 14 calendar days
function computeARRDueDate(fsDateReceived) {
    if (!fsDateReceived) return null;
    const received = new Date(fsDateReceived);
    const due = new Date(received);
    due.setDate(due.getDate() + 14);
    return due;
}

function formatDueDate(dateObj) {
    if (!dateObj) return '—';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[dateObj.getMonth()] + ' ' + dateObj.getDate().toString().padStart(2, '0') + ', ' + dateObj.getFullYear();
}

function arrDeadlineHTML(fsDateReceived) {
    if (!fsDateReceived) return '<span class="deadline-badge deadline-na">No FS date</span>';
    const ref = new Date(2024, 3, 15); // April 15, 2024
    const due = computeARRDueDate(fsDateReceived);
    const daysLeft = Math.ceil((due - ref) / (1000 * 60 * 60 * 24));
    const label = formatDueDate(due);
    if (daysLeft < 0) {
        return '<span class="deadline-badge deadline-overdue">Due ' + label + ' (Overdue by ' + Math.abs(daysLeft) + 'd)</span>';
    } else if (daysLeft <= 7) {
        return '<span class="deadline-badge deadline-warning">Due ' + label + ' (' + daysLeft + 'd remaining)</span>';
    } else {
        return '<span class="deadline-badge deadline-ok">Due ' + label + ' (' + daysLeft + 'd remaining)</span>';
    }
}

// BR-4: Required frequency by authority level
// Branch = Annual, Director/Region = Semi-Annual, Beyond Director (CAO) = Quarterly
// BR-5: Supervisor may override with recorded approver, date, rationale
function getRequiredFrequency(accountName) {
    const profile = accountProfiles[accountName];
    if (!profile) {
        return { frequency: 'Annual', source: 'Default', override: null };
    }
    if (profile.frequencyOverride) {
        return {
            frequency: profile.frequencyOverride.newFrequency,
            source: 'Override',
            override: profile.frequencyOverride
        };
    }
    return { frequency: profile.arrFrequency, source: 'Policy (BR-4)', override: null };
}

function frequencyBadgeHTML(accountName) {
    const freq = getRequiredFrequency(accountName);
    let cls = 'freq-annual';
    if (freq.frequency === 'Semi-Annual') cls = 'freq-semi';
    else if (freq.frequency === 'Quarterly') cls = 'freq-quarterly';
    let html = '<span class="freq-badge ' + cls + '">' + freq.frequency + '</span>';
    if (freq.source === 'Override') {
        html += ' <span class="freq-override-indicator" title="Overridden by ' + freq.override.approver + ' on ' + freq.override.approvalDate + '">\u26A0 Override</span>';
    }
    return html;
}

// BR-2: Active accounts require annual CPA + at least one interim FS per year
function checkFSCompliance(accountName) {
    const ref = new Date(2024, 3, 15); // April 15, 2024
    const profile = accountProfiles[accountName];
    const issues = [];

    if (!profile) {
        issues.push({ type: 'warning', message: 'No account profile found — cannot verify FS compliance' });
        return { compliant: false, issues: issues };
    }

    // Check annual CPA — should have one within last 18 months
    if (profile.lastAnnualCPADate) {
        const lastCPA = new Date(profile.lastAnnualCPADate);
        const monthsSince = (ref.getFullYear() - lastCPA.getFullYear()) * 12 + (ref.getMonth() - lastCPA.getMonth());
        if (monthsSince > 18) {
            issues.push({ type: 'urgent', message: 'Annual CPA is ' + monthsSince + ' months old (last: ' + profile.lastAnnualCPADate + ')' });
        } else if (monthsSince > 12) {
            issues.push({ type: 'warning', message: 'Annual CPA approaching staleness (' + monthsSince + ' months old)' });
        }
    } else {
        issues.push({ type: 'urgent', message: 'No annual CPA statement on file' });
    }

    // Check interim FS — at least one per year for active accounts
    const freq = getRequiredFrequency(accountName);
    if (freq.frequency === 'Semi-Annual' || freq.frequency === 'Quarterly') {
        if (!profile.lastInterimDate) {
            issues.push({ type: 'warning', message: 'No interim financial statement on file (required for ' + freq.frequency + ' frequency)' });
        } else {
            const lastInterim = new Date(profile.lastInterimDate);
            const monthsSinceInterim = (ref.getFullYear() - lastInterim.getFullYear()) * 12 + (ref.getMonth() - lastInterim.getMonth());
            const maxMonths = freq.frequency === 'Quarterly' ? 6 : 12;
            if (monthsSinceInterim > maxMonths) {
                issues.push({ type: 'warning', message: 'Interim FS is ' + monthsSinceInterim + ' months old (last: ' + profile.lastInterimDate + ')' });
            }
        }
    }

    return { compliant: issues.length === 0, issues: issues };
}

// ==================== ACCOUNT LINK HELPER ====================

function accountLink(name) {
    return `<span class="account-link" onclick="openAccountNotesDetail('${name.replace(/'/g, "\\'")}'); navigateTo('account-notes');">${name}</span>`;
}

function myAccountLink(name) {
    return `<span class="account-link" onclick="navigateToMyAccount('${name.replace(/'/g, "\\'")}')">${name}</span>`;
}

function navigateToMyAccount(acctName) {
    closeAllModals();
    navigateTo('my-accounts');
    renderMyAccounts();
    // Brief delay to ensure DOM is rendered, then find and highlight the row
    setTimeout(() => {
        const rows = document.querySelectorAll('#my-accounts-table-body tr');
        for (const row of rows) {
            const firstCell = row.querySelector('td');
            if (firstCell && firstCell.textContent.trim().startsWith(acctName)) {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                row.style.transition = 'background 0.3s';
                row.style.background = 'var(--accent-blue-bg)';
                setTimeout(() => { row.style.background = ''; }, 2000);
                break;
            }
        }
    }, 100);
}

// ==================== KPI VALUES ====================

function updateKPIValues() {
    const myARRs = sampleARRs.filter(a => a.assignee === currentUser.name);
    const myBondRequests = sampleBondRequests.filter(b => b.assignee === currentUser.name);
    const myLOAs = sampleLOAData.filter(l => l.assignee === currentUser.name);

    const arrCount = myARRs.filter(a => a.status === 'Due' || a.status === 'Overdue').length;
    const bondReqCount = myBondRequests.filter(b => b.status === 'Awaiting Approval' || b.status === 'UW Review').length;
    const watchlistCount = myARRs.filter(a => a.risk === 'high').length;
    const expiringLOACount = myLOAs.filter(l => {
        if (getLOAStatus(l) !== 'Active') return false;
        const exp = new Date(l.expDate);
        const now = new Date();
        const diff = (exp - now) / (1000 * 60 * 60 * 24);
        return diff <= 30 && diff >= 0;
    }).length;

    const kpiEls = document.querySelectorAll('.kpi-grid-4 .kpi-value');
    if (kpiEls[0]) kpiEls[0].textContent = arrCount;
    if (kpiEls[1]) kpiEls[1].textContent = bondReqCount;
    if (kpiEls[2]) kpiEls[2].textContent = watchlistCount;
    if (kpiEls[3]) kpiEls[3].textContent = expiringLOACount;

    // BR-2: FS Compliance Issues count
    let fsComplianceCount = 0;
    Object.keys(accountProfiles).forEach(acctName => {
        const isMyAccount = sampleARRs.some(a => a.account === acctName && a.assignee === currentUser.name);
        if (!isMyAccount) return;
        const compliance = checkFSCompliance(acctName);
        if (!compliance.compliant) fsComplianceCount += compliance.issues.length;
    });
    const fsKpi = document.getElementById('kpi-fs-compliance');
    if (fsKpi) fsKpi.textContent = fsComplianceCount;
}

// ==================== BOND REQUEST BADGE ====================

function updateBondRequestBadge() {
    const count = sampleBondRequests.filter(b => b.status === 'Awaiting Approval').length;
    const badge = document.getElementById('bond-requests-badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
}

// ==================== WEEK AT A GLANCE (HOME) ====================

function renderWeekAtGlance() {
    // Determine current week boundaries (Sun—Sat containing "today")
    // Using April 15, 2024 as reference date to match sample data
    const today = new Date(2024, 3, 15); // April 15, 2024
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // Format helper
    const fmtShort = d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    // ---- This Week's Bids ----
    const weekBids = sampleBidLog.filter(b => {
        const d = new Date(b.bidDate);
        return d >= weekStart && d <= weekEnd;
    }).sort((a, b) => new Date(a.bidDate) - new Date(b.bidDate));

    const bidsEl = document.getElementById('home-week-bids');
    if (bidsEl) {
        if (weekBids.length === 0) {
            bidsEl.innerHTML = '<div class="week-glance-empty">No bids scheduled this week</div>';
        } else {
            bidsEl.innerHTML = weekBids.map(b => {
                const bidDate = new Date(b.bidDate);
                const isToday = bidDate.toDateString() === today.toDateString();
                const sc = statusClass(b.status);
                return `<div class="week-glance-item ${isToday ? 'week-glance-today' : ''}">
                    <div class="week-glance-date">${isToday ? 'Today' : fmtShort(bidDate)}</div>
                    <div class="week-glance-detail">
                        <div class="week-glance-title">${b.projectName}</div>
                        <div class="week-glance-meta">${b.obligee} &middot; ${fmt(b.contractValue)} &middot; <span class="status-badge ${sc}">${b.status}</span></div>
                    </div>
                    <div class="week-glance-action"><button class="btn btn-outline btn-sm" onclick="navigateTo('bid-calendar')">View</button></div>
                </div>`;
            }).join('');
        }
    }

    // ---- This Week's Reminders ----
    const weekReminders = sampleReminders.filter(r => {
        if (r.status === 'Completed') return false;
        const d = new Date(r.date);
        return d >= weekStart && d <= weekEnd;
    }).sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));

    const remEl = document.getElementById('home-week-reminders');
    if (remEl) {
        if (weekReminders.length === 0) {
            remEl.innerHTML = '';
        } else {
            remEl.innerHTML = '<div style="border-top:1px solid #e5e7eb;margin-top:12px;padding-top:8px;">' +
                weekReminders.map(r => {
                    const remDate = new Date(r.date);
                    const isToday = remDate.toDateString() === today.toDateString();
                    return `<div class="week-glance-item ${isToday ? 'week-glance-today' : ''}" style="cursor:pointer;" onclick="openAddReminderModal(${r.id})">
                        <div class="week-glance-date">${isToday ? 'Today' : fmtShort(remDate)}</div>
                        <div class="week-glance-detail">
                            <div class="week-glance-title" style="color:#6b21a8;">&#128276; ${r.title}</div>
                            <div class="week-glance-meta">${r.time}${r.account ? ' &middot; ' + r.account : ''}</div>
                        </div>
                    </div>`;
                }).join('') + '</div>';
        }
    }
}

function renderActionItems() {
    const today = new Date(2024, 3, 15); // April 15, 2024
    const container = document.getElementById('home-action-items');
    if (!container) return;

    const items = [];

    // --- URGENT (red) ---

    // Overdue ARRs
    sampleARRs.filter(a => a.assignee === currentUser.name && a.status === 'Overdue').forEach(a => {
        items.push({ priority: 0, level: 'urgent', category: 'ARR', account: a.account,
            text: `Account review overdue by ${a.daysOverdue} days (${a.type} \u2014 ${a.level})`,
            view: 'account-review' });
    });

    // Open/Investigating Claims
    sampleClaims.filter(c => c.status === 'Open' || c.status === 'Investigating').forEach(c => {
        // Check if this bond belongs to one of the user's accounts
        const bond = sampleBonds.find(b => b.bondNumber === c.bondNumber);
        if (!bond) return;
        const isMyAccount = sampleARRs.some(a => a.account === bond.principal && a.assignee === currentUser.name) ||
                            sampleLOAData.some(l => l.account === bond.principal && l.assignee === currentUser.name);
        if (!isMyAccount) return;
        items.push({ priority: 1, level: 'urgent', category: 'Claim', account: bond.principal,
            text: `${c.claimNumber} \u2014 ${c.claimant} \u2014 ${c.amount} (${c.status})`,
            view: 'claims' });
    });

    // LOAs expiring within 30 days
    sampleLOAData.filter(l => l.assignee === currentUser.name && getLOAStatus(l) === 'Active').forEach(l => {
        const exp = new Date(l.expDate);
        const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        if (daysLeft >= 0 && daysLeft <= 30) {
            items.push({ priority: 2, level: 'urgent', category: 'LOA', account: l.account,
                text: `${l.type} LOA expires in ${daysLeft} days (${l.expDate}) \u2014 Single ${fmt(l.single)} / Agg ${fmt(l.aggregate)}`,
                view: 'loa' });
        }
    });

    // --- WARNING (amber) ---

    // Bonds Expiring Soon
    sampleBonds.filter(b => b.status === 'Expiring Soon').forEach(b => {
        const isMyAccount = sampleARRs.some(a => a.account === b.principal && a.assignee === currentUser.name) ||
                            sampleLOAData.some(l => l.account === b.principal && l.assignee === currentUser.name);
        if (!isMyAccount) return;
        const exp = new Date(b.expirationDate);
        const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        items.push({ priority: 3, level: 'warning', category: 'Bond', account: b.principal,
            text: `${b.bondNumber} (${b.bondType} \u2014 ${b.amount}) expires in ${daysLeft} days`,
            view: 'bonds' });
    });

    // Bond Requests Awaiting Approval
    sampleBondRequests.filter(b => b.assignee === currentUser.name && b.status === 'Awaiting Approval').forEach(b => {
        items.push({ priority: 4, level: 'warning', category: 'Bond Req', account: b.account,
            text: `${b.type} \u2014 ${b.amount} for ${b.obligee} \u2014 awaiting your approval`,
            view: 'bond-requests' });
    });

    // Visitation Follow-Ups overdue or due soon
    sampleVisitations.filter(v => v.followUpRequired && v.followUpDate).forEach(v => {
        const fud = new Date(v.followUpDate);
        const daysOut = Math.ceil((fud - today) / (1000 * 60 * 60 * 24));
        if (daysOut >= -30 && daysOut <= 30) {
            const overdue = daysOut < 0;
            items.push({
                priority: overdue ? 2.5 : 5, level: overdue ? 'urgent' : 'warning',
                category: 'Visit', account: v.account,
                text: overdue
                    ? `Follow-up overdue by ${Math.abs(daysOut)} days (${v.purpose} \u2014 ${v.visitedBy})`
                    : `Follow-up due in ${daysOut} days (${v.purpose} \u2014 ${v.visitedBy})`,
                view: 'visitations'
            });
        }
    });

    // LOAs expiring 31-60 days
    sampleLOAData.filter(l => l.assignee === currentUser.name && getLOAStatus(l) === 'Active').forEach(l => {
        const exp = new Date(l.expDate);
        const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        if (daysLeft > 30 && daysLeft <= 60) {
            items.push({ priority: 5.5, level: 'warning', category: 'LOA', account: l.account,
                text: `${l.type} LOA expires in ${daysLeft} days (${l.expDate})`,
                view: 'loa' });
        }
    });

    // --- INFO (blue) ---

    // ARRs Due (not overdue)
    sampleARRs.filter(a => a.assignee === currentUser.name && a.status === 'Due').forEach(a => {
        const due = new Date(a.dueDate);
        const daysUntil = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        items.push({ priority: 6, level: 'info', category: 'ARR', account: a.account,
            text: `${a.type} review due ${daysUntil <= 0 ? 'today' : 'in ' + daysUntil + ' days'} (${a.level} level)`,
            view: 'account-review' });
    });

    // Bids Pending Results
    sampleBidLog.filter(b => b.status === 'Pending Bid').forEach(b => {
        const bidDate = new Date(b.bidDate);
        const daysAgo = Math.ceil((today - bidDate) / (1000 * 60 * 60 * 24));
        if (daysAgo >= 0 && daysAgo <= 45) {
            items.push({ priority: 7, level: 'info', category: 'Bid', account: b.projectName,
                text: `${b.obligee} \u2014 ${fmt(b.contractValue)} \u2014 result pending${daysAgo > 0 ? ' (' + daysAgo + ' days since bid)' : ''}`,
                view: 'bid-calendar' });
        }
    });

    // Bids to Convert to Bond
    sampleBidLog.filter(b => b.status === 'Convert to Bond').forEach(b => {
        items.push({ priority: 6.5, level: 'info', category: 'Bid', account: b.projectName,
            text: `${b.obligee} \u2014 ${fmt(b.contractValue)} \u2014 ready to convert to bond`,
            view: 'bid-calendar' });
    });

    // FR-6: ARRs within 7 days of 14-day deadline (not yet overdue)
    sampleARRs.filter(a => a.assignee === currentUser.name && a.fsDateReceived && a.status !== 'Overdue').forEach(a => {
        const due = computeARRDueDate(a.fsDateReceived);
        if (!due) return;
        const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        if (daysLeft >= 0 && daysLeft <= 7) {
            items.push({ priority: 2.8, level: 'urgent', category: 'Deadline', account: a.account,
                text: `14-day ARR deadline in ${daysLeft} day${daysLeft !== 1 ? 's' : ''} (FS received ${a.fsDateReceived}) \u2014 ${a.type}`,
                view: 'account-review' });
        }
    });

    // BR-2: FS compliance issues per account profile
    Object.keys(accountProfiles).forEach(acctName => {
        const isMyAccount = sampleARRs.some(a => a.account === acctName && a.assignee === currentUser.name);
        if (!isMyAccount) return;
        const compliance = checkFSCompliance(acctName);
        if (!compliance.compliant) {
            compliance.issues.forEach(issue => {
                items.push({
                    priority: issue.type === 'urgent' ? 1.5 : 4.5,
                    level: issue.type === 'urgent' ? 'urgent' : 'warning',
                    category: 'FS Compliance', account: acctName,
                    text: issue.message,
                    view: 'financials'
                });
            });
        }
    });

    // BR-5: Frequency override active — informational
    Object.entries(accountProfiles).forEach(([acctName, profile]) => {
        if (!profile.frequencyOverride) return;
        const isMyAccount = sampleARRs.some(a => a.account === acctName && a.assignee === currentUser.name);
        if (!isMyAccount) return;
        items.push({ priority: 6.8, level: 'info', category: 'Override', account: acctName,
            text: `Frequency override active: ${profile.frequencyOverride.newFrequency} (set by ${profile.frequencyOverride.approver} on ${profile.frequencyOverride.approvalDate})`,
            view: 'account-review' });
    });

    // Red Flag accounts belonging to current user
    Object.entries(sampleRedFlagData).forEach(([acct, data]) => {
        if (data.assignee !== currentUser.name) return;
        const latestRatios = data.ratios;
        let flagCount = 0;
        Object.values(latestRatios).forEach(periods => { if (periods[0] && periods[0].flag) flagCount++; });
        if (flagCount >= 3) {
            items.push({ priority: 5, level: 'warning', category: 'Red Flag', account: acct,
                text: `${flagCount} red-flagged financial ratios on latest period (Grade: ${data.grade})`,
                view: 'red-flags' });
        }
    });

    // Reminders with dashboard alerts
    sampleReminders.filter(r => r.alertOnDashboard && r.status === 'Active').forEach(r => {
        const remDate = new Date(r.date + ' ' + r.time);
        const daysUntil = Math.ceil((remDate - today) / (1000 * 60 * 60 * 24));
        const isPast = daysUntil < 0;
        const isToday = daysUntil === 0;
        let level, priority;
        if (isPast) { level = 'urgent'; priority = 1.2; }
        else if (isToday) { level = 'urgent'; priority = 1.8; }
        else if (daysUntil <= 3) { level = 'warning'; priority = 3.5; }
        else { level = 'info'; priority = 7.5; }
        items.push({
            priority, level, category: 'Reminder',
            account: r.account || 'General',
            text: `${r.title}${isPast ? ' (overdue — ' + r.date + ')' : isToday ? ' (today at ' + r.time + ')' : ' (' + r.date + ' at ' + r.time + ')'}${r.notes ? ' — ' + r.notes : ''}`,
            view: 'bid-calendar'
        });
    });

    // Sort by priority
    items.sort((a, b) => a.priority - b.priority);

    if (items.length === 0) {
        container.innerHTML = '<div class="week-glance-empty">No action items \u2014 you\'re all caught up</div>';
        return;
    }

    // Render with scrollable max-height
    var maxActions = 10;
    try { maxActions = getDashboardPrefs().config.actionItemsMaxCount || 10; } catch(e) {}
    var displayItems = items.slice(0, maxActions);
    container.innerHTML = displayItems.map(it => {
        const levelClass = it.level === 'urgent' ? 'action-urgent' : it.level === 'warning' ? 'action-warning' : 'action-info';
        return `<div class="action-item action-item-${it.level}">
            <div class="action-priority ${levelClass}">${it.category}</div>
            <div class="action-body">
                <div class="action-title">${it.view === 'bid-calendar' ? it.account : accountLink(it.account)}</div>
                <div class="action-text">${it.text}</div>
            </div>
            <div class="action-go"><button class="btn btn-outline btn-sm" onclick="navigateTo('${it.view}')">\u2192</button></div>
        </div>`;
    }).join('');
    if (items.length > maxActions) {
        container.innerHTML += '<div style="text-align:center;padding:8px;color:#6b7280;font-size:12px;">Showing ' + maxActions + ' of ' + items.length + ' items &mdash; <a href="#" onclick="event.preventDefault();openDashboardSettings();" style="color:var(--accent-brand);">change limit</a></div>';
    }
}

// ==================== NAVIGATION ====================

function navigateTo(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    // Show target view
    const target = document.getElementById('view-' + viewId);
    if (target) target.classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (navItem) navItem.classList.add('active');

    // Update breadcrumb
    const crumb = document.getElementById('breadcrumb');
    const names = {
        'underwriting-home': 'My Dashboard', 'financial-statements': 'Financial Statements',
        'wip': 'Work in Progress', 'account-review': 'Account Review', 'bonds': 'Show Bonds',
        'bid-log': 'Bid Log', 'bid-calendar': 'Bid/Reminder Calendar', 'bond-requests': 'Bond Requests', 'claims': 'Show Claims',
        'reports': 'Reports', 'exposure': 'Exposure Map',
        'messages': 'Messages', 'account-notes': 'Account Notes',
        'loa': 'Letters of Authority', 'my-accounts': 'My Accounts',
        'portfolio-analysis': 'Portfolio Analysis', 'red-flags': 'Red Flag Accounts',
        'premium-ar': 'Premium AR by Agency', 'visitations': 'Agency Visits'
    };
    if (crumb) crumb.innerHTML = `<span>${names[viewId] || viewId}</span>`;
}

// Sidebar click handlers
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.view));
});

// Sidebar toggle
document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

// ==================== GENERIC TABLE SORT UTILITY ====================

const tableSortState = {};

function getTableSort(tableId, defaultCol) {
    if (!tableSortState[tableId]) tableSortState[tableId] = { col: defaultCol || '', asc: true };
    return tableSortState[tableId];
}

function toggleTableSort(tableId, col, renderFn) {
    const st = getTableSort(tableId);
    if (st.col === col) { st.asc = !st.asc; } else { st.col = col; st.asc = true; }
    renderFn();
}

function sortArrow(tableId, col) {
    const st = tableSortState[tableId];
    if (!st || st.col !== col) return '';
    return st.asc ? ' \u25B2' : ' \u25BC';
}

function parseCurrency(s) {
    if (typeof s === 'number') return s;
    return parseFloat(String(s).replace(/[^0-9.\-]/g, '')) || 0;
}

function parseDate(s) {
    if (!s || s === '—') return new Date(0);
    return new Date(s);
}

function genericSort(data, col, asc, comparators) {
    const cmp = comparators[col];
    if (!cmp) return data;
    return data.slice().sort((a, b) => {
        const result = cmp(a, b);
        return asc ? result : -result;
    });
}

function buildSortableHeader(tableId, columns, renderFn) {
    return '<tr>' + columns.map(c => {
        if (c.sortable === false) return `<th>${c.label}</th>`;
        return `<th class="sortable" onclick="toggleTableSort('${tableId}', '${c.key}', ${renderFn})">${c.label}${sortArrow(tableId, c.key)}</th>`;
    }).join('') + '</tr>';
}

// ==================== RENDER: UNDERWRITING HOME ====================

let arrSortCol = 'account';
let arrSortAsc = true;

function sortARRs(list) {
    const riskOrder = { high: 0, medium: 1, low: 2 };
    const freqOrder = { 'Quarterly': 0, 'Semi-Annual': 1, 'Annual': 2 };
    return list.slice().sort((a, b) => {
        let cmp = 0;
        switch (arrSortCol) {
            case 'account': { cmp = a.account.localeCompare(b.account); break; }
            case 'due': { cmp = new Date(a.dueDate) - new Date(b.dueDate); break; }
            case 'risk': { cmp = (riskOrder[a.risk] ?? 9) - (riskOrder[b.risk] ?? 9); break; }
            case 'grade': { cmp = a.grade.localeCompare(b.grade); break; }
            case 'freq': {
                const fa = getRequiredFrequency(a.account).frequency;
                const fb = getRequiredFrequency(b.account).frequency;
                cmp = (freqOrder[fa] ?? 9) - (freqOrder[fb] ?? 9);
                break;
            }
            case 'queue': { cmp = a.currentQueue.localeCompare(b.currentQueue); break; }
            case 'status': { cmp = a.status.localeCompare(b.status); break; }
        }
        return arrSortAsc ? cmp : -cmp;
    });
}

function toggleARRSort(col) {
    if (arrSortCol === col) {
        arrSortAsc = !arrSortAsc;
    } else {
        arrSortCol = col;
        arrSortAsc = true;
    }
    renderARRList();
}

function renderARRList() {
    const container = document.getElementById('arr-list');
    if (!container) return;
    const myARRs = sampleARRs.filter(a => a.assignee === currentUser.name);
    const sorted = sortARRs(myARRs);
    var maxARR = 5;
    try { maxARR = getDashboardPrefs().config.arrListMaxCount || 5; } catch(e) {}
    const display = sorted.slice(0, maxARR);
    const cols = [
        { key: 'account', label: 'Account' },
        { key: 'due', label: 'Due Date' },
        { key: 'risk', label: 'Risk' },
        { key: 'grade', label: 'Grade' },
        { key: 'freq', label: 'Freq' },
        { key: 'queue', label: 'Queue' },
        { key: 'status', label: 'Status' }
    ];
    const header = `<div class="arr-header">${cols.map(c => {
        const arrow = arrSortCol === c.key ? (arrSortAsc ? ' &#9650;' : ' &#9660;') : '';
        return `<span class="arr-sort-col" onclick="toggleARRSort('${c.key}')">${c.label}${arrow}</span>`;
    }).join('')}</div>`;
    const rows = display.map(arr => {
        const queueLabel = arr.currentQueue === currentUser.name
            ? '<span class="queue-badge queue-you">In Your Queue</span>'
            : `<span class="queue-badge queue-other">${arr.currentQueue} (${chainTitles[arr.currentQueue] || ''})</span>`;
        const riskCls = arr.risk === 'high' ? 'risk-high' : arr.risk === 'medium' ? 'risk-med' : 'risk-low';
        const freqInfo = getRequiredFrequency(arr.account);
        return `<div class="arr-card" onclick="navigateTo('account-review')">
            <div class="arr-cell arr-cell-account">
                <span class="arr-account">${accountLink(arr.account)}</span>
                <span class="arr-subtext">${arr.type} Review &bull; ${arr.level} Level</span>
            </div>
            <div class="arr-cell arr-cell-due">${arr.dueDate}${arr.daysOverdue > 0 ? ' <span style="color:#c62828; font-weight:600;">(' + arr.daysOverdue + 'd)</span>' : ''}</div>
            <div class="arr-cell arr-cell-risk"><span class="arr-risk-dot ${riskCls}"></span>${arr.risk.charAt(0).toUpperCase() + arr.risk.slice(1)}</div>
            <div class="arr-cell arr-cell-grade">${arr.grade}</div>
            <div class="arr-cell arr-cell-freq">${freqInfo.frequency}</div>
            <div class="arr-cell arr-cell-queue">${queueLabel}${queueAgeHTML(arr.queueEnteredDate)}</div>
            <div class="arr-cell arr-cell-status"><span class="status-badge ${statusClass(arr.status)}">${arr.status}</span></div>
        </div>`;
    }).join('');
    container.innerHTML = header + rows;
    if (sorted.length > maxARR) {
        container.innerHTML += '<div style="text-align:center;padding:8px;color:#6b7280;font-size:12px;">Showing ' + maxARR + ' of ' + sorted.length + ' reviews &mdash; <a href="#" onclick="event.preventDefault();openDashboardSettings();" style="color:var(--accent-brand);">change limit</a></div>';
    }
}

function renderBondRequests(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="bond-requests-header">
            <span>Request Details</span>
            <span style="text-align:center;">Underwriter</span>
            <span style="text-align:center;">Status</span>
        </div>` + data.map(br => `
        <div class="bond-request-card ${br.status === 'Awaiting Approval' ? 'awaiting-highlight' : ''}">
            <div class="br-left">
                <span class="branch-tag">${br.branch}</span>
                <span class="br-title">${accountLink(br.account)} &mdash; ${br.type}</span>
                <span class="br-details">${br.amount} &bull; Obligee: ${br.obligee} &bull; Submitted: ${br.date}</span>
            </div>
            <div class="br-middle"><span class="br-assignee">${br.assignee}</span></div>
            <div class="br-right"><span class="status-badge ${statusClass(br.status)}">${br.status}</span></div>
        </div>
    `).join('');
}

function filterBondRequests(filter, tabEl) {
    // Update active tab
    document.querySelectorAll('#bond-requests-tabs .tab').forEach(t => t.classList.remove('active'));
    if (tabEl) tabEl.classList.add('active');

    // Filter data
    let filtered = sampleBondRequests;
    if (filter !== 'all') {
        filtered = sampleBondRequests.filter(br => br.status === filter);
    }
    renderBondRequests('bond-requests-full-list', filtered);
}

// ==================== RENDER: FINANCIAL STATEMENTS ====================

function renderFinancials() {
    const thead = document.getElementById('financials-head');
    const tbody = document.getElementById('financials-table-body');

    const cols = [
        { key: 'id', label: 'Stmt #' },
        { key: 'statementType', label: 'Type' },
        { key: 'date', label: 'Date' },
        { key: 'dateReceived', label: 'Received' },
        { key: 'source', label: 'Source' },
        { key: 'term', label: 'Term' },
        { key: 'fye', label: 'FYE' },
        { key: 'preparer', label: 'Preparer' },
        { key: 'firm', label: 'Acctg Firm' },
        { key: 'auditStatus', label: 'Audit' },
        { key: 'balanced', label: 'Bal.' },
        { key: 'approved', label: 'Appr.' },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const comparators = {
        id: (a, b) => a.id.localeCompare(b.id),
        statementType: (a, b) => (a.statementType || '').localeCompare(b.statementType || ''),
        date: (a, b) => parseDate(a.date) - parseDate(b.date),
        dateReceived: (a, b) => parseDate(a.dateReceived) - parseDate(b.dateReceived),
        source: (a, b) => (a.source || '').localeCompare(b.source || ''),
        term: (a, b) => a.term - b.term,
        fye: (a, b) => a.fye.localeCompare(b.fye),
        preparer: (a, b) => a.preparer.localeCompare(b.preparer),
        firm: (a, b) => a.firm.localeCompare(b.firm),
        auditStatus: (a, b) => a.auditStatus.localeCompare(b.auditStatus),
        balanced: (a, b) => (a.balanced === b.balanced ? 0 : a.balanced ? -1 : 1),
        approved: (a, b) => (a.approved === b.approved ? 0 : a.approved ? -1 : 1)
    };

    const st = getTableSort('financials', 'date');
    const sorted = genericSort(sampleFinancials, st.col, st.asc, comparators);

    if (thead) thead.innerHTML = buildSortableHeader('financials', cols, 'renderFinancials');

    tbody.innerHTML = sorted.map(fs => `
        <tr>
            <td><span class="clickable-cell" onclick="openFSDetail('${fs.id}')">${fs.id}</span></td>
            <td><span class="fs-type-badge fs-type-${fs.statementType === 'Annual CPA' ? 'annual' : 'interim'}">${fs.statementType || '—'}</span></td>
            <td>${fs.date}</td>
            <td>${fs.dateReceived || '—'}</td>
            <td>${fs.source || '—'}</td>
            <td>${fs.term} Mo.</td>
            <td>${fs.fye}</td>
            <td class="wrap-cell">${fs.preparer}</td>
            <td class="wrap-cell">${fs.firm}</td>
            <td>${fs.auditStatus}</td>
            <td><span class="status-badge ${fs.balanced ? 'balanced' : 'pending'}">${fs.balanced ? 'Yes' : 'No'}</span></td>
            <td><span class="status-badge ${fs.approved ? 'approved' : 'pending'}">${fs.approved ? 'Yes' : 'Pending'}</span></td>
            <td>
                <button class="action-btn" onclick="openFSDetail('${fs.id}')">View</button>
                <button class="action-btn" onclick="openFSNotes('${fs.id}')">Notes</button>
                <button class="action-btn delete-btn" onclick="openDeleteConfirm('financial statement', '${fs.id}', 'deleteFinancial(\\\'${fs.id}\\\')')">Del</button>
            </td>
        </tr>
    `).join('');
}

// ==================== RENDER: WIP ====================

function renderWIPSummary() {
    const tbody = document.getElementById('wip-summary-body');
    tbody.innerHTML = sampleWIPSchedules.map((w, i) => `
        <tr>
            <td>${w.date}</td>
            <td>${fmt(w.contractPrice)}</td>
            <td>${fmt(w.billedToDate)}</td>
            <td>${fmt(w.costToDate)}</td>
            <td>${fmt(w.costToComplete)}</td>
            <td>${fmt(w.totalCost)}</td>
            <td>${fmt(w.grossProfit)}</td>
            <td>${w.lastUpdated}</td>
            <td>
                <button class="action-btn" onclick="openWIPDetail(${i})">View</button>
                <button class="action-btn" onclick="openWIPNotes(${i})">Notes</button>
                <button class="action-btn delete-btn" onclick="openDeleteConfirm('WIP schedule', '${w.date}', 'deleteWIP(${i})')">Del</button>
            </td>
        </tr>
    `).join('');
}

function renderWIPDetail(idx) {
    const schedule = sampleWIPSchedules[idx];
    document.getElementById('wip-detail-title').textContent = 'WIP Schedule — ' + schedule.date;
    document.getElementById('wip-detail-date').textContent = 'Schedule Date: ' + schedule.date;

    const tbody = document.getElementById('wip-detail-body');
    tbody.innerHTML = sampleWIPJobs.map(j => `
        <tr>
            <td>${j.sort}</td>
            <td>${j.name}</td>
            <td>${fmt(j.contractPrice)}</td>
            <td>${fmt(j.billedToDate)}</td>
            <td>${fmt(j.costToDate)}</td>
            <td>${fmt(j.costToComplete)}</td>
            <td>${fmt(j.totalCost)}</td>
            <td>${fmt(j.grossProfit)}</td>
            <td>${j.pctComplete}%</td>
        </tr>
    `).join('');

    const footer = document.getElementById('wip-detail-footer');
    footer.innerHTML = `<tr>
        <td></td><td style="font-weight:700;">TOTALS</td>
        <td>${fmt(schedule.contractPrice)}</td>
        <td>${fmt(schedule.billedToDate)}</td>
        <td>${fmt(schedule.costToDate)}</td>
        <td>${fmt(schedule.costToComplete)}</td>
        <td>${fmt(schedule.totalCost)}</td>
        <td>${fmt(schedule.grossProfit)}</td>
        <td></td>
    </tr>`;
}

function renderMasterJobs() {
    const tbody = document.getElementById('master-jobs-body');
    tbody.innerHTML = sampleMasterJobs.map(j => `
        <tr>
            <td>${j.name}</td>
            <td><span class="branch-tag-sm">${j.source}</span></td>
            <td>${fmt(j.contractAmount)}</td>
            <td><span class="status-badge ${j.status === 'Completed' ? 'complete' : 'in-progress'}">${j.status}</span></td>
            <td>${j.bondNumber}</td>
            <td>${j.yearCompleted}</td>
        </tr>
    `).join('');
}

function renderLargestJobs() {
    const tbody = document.getElementById('largest-jobs-body');
    tbody.innerHTML = sampleLargestJobs.map(j => `
        <tr>
            <td>${j.description}</td>
            <td>${fmt(j.contractAmount)}</td>
            <td>${fmt(j.grossProfit)}</td>
            <td>${j.yearCompleted}</td>
        </tr>
    `).join('');
}

// ==================== RENDER: BID LOG ====================

function renderLOAGrid() {
    const tbody = document.getElementById('loa-grid-body');
    tbody.innerHTML = sampleLOAs.map(l => `
        <tr>
            <td>${l.type}</td>
            <td>${l.effDate}</td>
            <td>${l.expDate}</td>
            <td>${fmt(l.single)}</td>
            <td>${fmt(l.aggregate)}</td>
            <td>${l.toUser}</td>
            <td><span class="status-badge ${statusClass(getLOAStatus(l))}">${getLOAStatus(l)}</span></td>
        </tr>
    `).join('');
}

let lastBidLogData = null;

function renderBidLog(data) {
    const bids = data || lastBidLogData || sampleBidLog;
    lastBidLogData = bids;
    const thead = document.getElementById('bid-log-head');
    const tbody = document.getElementById('bid-log-table-body');

    const cols = [
        { key: 'bidDate', label: 'Bid Date' },
        { key: 'projectName', label: 'Project Name' },
        { key: 'obligee', label: 'Obligee' },
        { key: 'contractValue', label: 'Contract Value' },
        { key: 'warranty', label: 'Warranty' },
        { key: 'bidBondAmt', label: 'Bid Bond Amt' },
        { key: 'potentialBacklog', label: 'Potential Backlog' },
        { key: 'bidResult', label: 'Bid Result' },
        { key: 'bidResultAmt', label: 'Bid Result - Bid Amt' },
        { key: 'status', label: 'Status' },
        { key: 'doa', label: 'DOA' },
        { key: 'notes', label: 'Notes', sortable: false },
        { key: 'delete', label: 'Delete', sortable: false },
        { key: 'docex', label: 'DocEx', sortable: false }
    ];

    const comparators = {
        bidDate: (a, b) => parseDate(a.bidDate) - parseDate(b.bidDate),
        projectName: (a, b) => a.projectName.localeCompare(b.projectName),
        obligee: (a, b) => a.obligee.localeCompare(b.obligee),
        contractValue: (a, b) => a.contractValue - b.contractValue,
        warranty: (a, b) => a.warranty.localeCompare(b.warranty),
        bidBondAmt: (a, b) => a.bidBondAmt - b.bidBondAmt,
        potentialBacklog: (a, b) => a.potentialBacklog - b.potentialBacklog,
        bidResult: (a, b) => a.bidResult.localeCompare(b.bidResult),
        bidResultAmt: (a, b) => (a.bidResultAmt || 0) - (b.bidResultAmt || 0),
        status: (a, b) => a.status.localeCompare(b.status),
        doa: (a, b) => a.doa.localeCompare(b.doa)
    };

    const st = getTableSort('bidLog', 'bidDate');
    const sorted = genericSort(bids, st.col, st.asc, comparators);

    if (thead) thead.innerHTML = buildSortableHeader('bidLog', cols, 'renderBidLog');

    tbody.innerHTML = sorted.map((b) => {
        const idx = sampleBidLog.indexOf(b);
        return `
        <tr>
            <td>${b.bidDate}</td>
            <td>${b.projectName}</td>
            <td>${b.obligee}</td>
            <td>${fmt(b.contractValue)}</td>
            <td>${b.warranty}</td>
            <td>${fmt(b.bidBondAmt)}</td>
            <td>${fmt(b.potentialBacklog)}</td>
            <td>${b.bidResult}</td>
            <td>${b.bidResultAmt ? fmt(b.bidResultAmt) : '-'}</td>
            <td><span class="status-badge ${statusClass(b.status)}">${b.status}</span></td>
            <td><span class="branch-tag-sm">${b.doa}</span></td>
            <td><button class="action-btn" onclick="openBidNotes(${idx})">Notes</button></td>
            <td><button class="action-btn delete-btn" onclick="openDeleteConfirm('bid row', '${b.projectName || 'Row ' + (idx+1)}', 'deleteBidRow(${idx})')">Del</button></td>
            <td><button class="action-btn" onclick="showToast('DocEx: ${b.projectName || 'No project'} — Document exchange opened')">DocEx</button></td>
        </tr>`;
    }).join('');
}

function filterBidLog() {
    const statusFilter = document.getElementById('bid-status-filter').value;
    const maxValue = parseInt(document.getElementById('bid-value-slider').value);
    const searchTerm = document.getElementById('bid-search-input').value.toLowerCase().trim();

    // Update slider label
    const label = document.getElementById('bid-value-label');
    if (maxValue >= 1000000) {
        label.textContent = '$' + (maxValue / 1000000).toFixed(1) + 'M';
    } else {
        label.textContent = '$' + (maxValue / 1000).toFixed(0) + 'k';
    }

    let filtered = sampleBidLog.filter(b => {
        // Status filter
        if (statusFilter !== 'all' && b.status !== statusFilter) return false;
        // Contract value filter
        if (b.contractValue > maxValue) return false;
        // Search filter
        if (searchTerm && !b.projectName.toLowerCase().includes(searchTerm) && !b.obligee.toLowerCase().includes(searchTerm)) return false;
        return true;
    });

    renderBidLog(filtered);
}

// ==================== BID CALENDAR ====================

let bidCalYear = 2024, bidCalMonth = 3; // 0-indexed: 3 = April
let bidCalViewMode = 'month';
let bidCalWeekStart = null; // Date object for week view start (Sunday)

function renderBidCalendar() {
    const titleEl = document.getElementById('bid-cal-title');
    const grid = document.getElementById('bid-cal-grid');
    if (!titleEl || !grid) return;

    // Build a map of bids by date string 'YYYY-MM-DD'
    const bidsByDate = {};
    sampleBidLog.forEach(b => {
        const parts = b.bidDate.split('/');
        const key = `${parts[2]}-${parts[0].padStart(2,'0')}-${parts[1].padStart(2,'0')}`;
        if (!bidsByDate[key]) bidsByDate[key] = [];
        bidsByDate[key].push(b);
    });

    // Build a map of reminders by date string 'YYYY-MM-DD'
    const remindersByDate = {};
    sampleReminders.forEach(r => {
        if (r.status === 'Completed') return;
        const parts = r.date.split('/');
        const key = `${parts[2]}-${parts[0].padStart(2,'0')}-${parts[1].padStart(2,'0')}`;
        if (!remindersByDate[key]) remindersByDate[key] = [];
        remindersByDate[key].push(r);
    });

    if (bidCalViewMode === 'month') {
        renderBidCalMonth(titleEl, grid, bidsByDate, remindersByDate);
    } else {
        renderBidCalWeek(titleEl, grid, bidsByDate, remindersByDate);
    }

    renderOutstandingBidBonds();
    renderUpcomingReminders();
}

function renderBidCalMonth(titleEl, grid, bidsByDate, remindersByDate) {
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    titleEl.textContent = `${monthNames[bidCalMonth]} ${bidCalYear}`;

    const firstDay = new Date(bidCalYear, bidCalMonth, 1);
    const lastDay = new Date(bidCalYear, bidCalMonth + 1, 0);
    const startDow = firstDay.getDay(); // 0=Sun
    const totalDays = lastDay.getDate();

    // Previous month trailing days
    const prevLastDay = new Date(bidCalYear, bidCalMonth, 0).getDate();

    let cells = '';
    // Leading empty cells from previous month
    for (let i = 0; i < startDow; i++) {
        const d = prevLastDay - startDow + 1 + i;
        cells += `<div class="bid-cal-cell bid-cal-cell-other"><span class="bid-cal-day-num">${d}</span></div>`;
    }
    // Current month days
    for (let d = 1; d <= totalDays; d++) {
        const key = `${bidCalYear}-${String(bidCalMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const bids = bidsByDate[key] || [];
        const reminders = remindersByDate[key] || [];
        const today = new Date();
        const isToday = (d === today.getDate() && bidCalMonth === today.getMonth() && bidCalYear === today.getFullYear());
        let cls = 'bid-cal-cell';
        if (isToday) cls += ' bid-cal-cell-today';
        if (bids.length > 0 || reminders.length > 0) cls += ' bid-cal-cell-has-bids';

        let bidsHtml = '';
        bids.forEach(b => {
            const sc = statusClass(b.status);
            bidsHtml += `<div class="bid-cal-entry bid-cal-entry-${sc}" title="${b.projectName} - ${b.status} - ${fmt(b.contractValue)}">${b.projectName.length > 22 ? b.projectName.substring(0,20) + '...' : b.projectName}</div>`;
        });
        reminders.forEach(r => {
            bidsHtml += `<div class="bid-cal-entry bid-cal-entry-reminder" title="${r.title} — ${r.time}${r.account ? ' — ' + r.account : ''}" onclick="openAddReminderModal(${r.id})" style="cursor:pointer;">&#128276; ${r.title.length > 18 ? r.title.substring(0,16) + '...' : r.title}</div>`;
        });

        cells += `<div class="${cls}"><span class="bid-cal-day-num">${d}</span>${bidsHtml}</div>`;
    }
    // Trailing cells to fill last row
    const totalCells = startDow + totalDays;
    const remainder = totalCells % 7;
    if (remainder > 0) {
        for (let i = 1; i <= 7 - remainder; i++) {
            cells += `<div class="bid-cal-cell bid-cal-cell-other"><span class="bid-cal-day-num">${i}</span></div>`;
        }
    }

    grid.innerHTML = cells;
}

function renderBidCalWeek(titleEl, grid, bidsByDate, remindersByDate) {
    if (!bidCalWeekStart) {
        // Default to first day of current month's first week
        const first = new Date(bidCalYear, bidCalMonth, 1);
        const dow = first.getDay();
        bidCalWeekStart = new Date(bidCalYear, bidCalMonth, 1 - dow);
    }

    const weekEnd = new Date(bidCalWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    titleEl.textContent = `${monthNames[bidCalWeekStart.getMonth()]} ${bidCalWeekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;

    let cells = '';
    for (let i = 0; i < 7; i++) {
        const day = new Date(bidCalWeekStart);
        day.setDate(day.getDate() + i);
        const key = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
        const bids = bidsByDate[key] || [];
        const reminders = remindersByDate[key] || [];
        const today = new Date();
        const isToday = (day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear());

        let cls = 'bid-cal-cell bid-cal-cell-week';
        if (isToday) cls += ' bid-cal-cell-today';
        if (bids.length > 0 || reminders.length > 0) cls += ' bid-cal-cell-has-bids';

        let bidsHtml = '';
        bids.forEach(b => {
            const sc = statusClass(b.status);
            bidsHtml += `<div class="bid-cal-entry bid-cal-entry-${sc}">
                <strong>${b.projectName}</strong><br>
                <span style="font-size:10px;color:var(--text-muted);">${b.obligee} &bull; ${fmt(b.contractValue)}</span>
            </div>`;
        });
        reminders.forEach(r => {
            bidsHtml += `<div class="bid-cal-entry bid-cal-entry-reminder" onclick="openAddReminderModal(${r.id})" style="cursor:pointer;">
                <strong>&#128276; ${r.title}</strong><br>
                <span style="font-size:10px;color:var(--text-muted);">${r.time}${r.account ? ' &bull; ' + r.account : ''}</span>
            </div>`;
        });

        cells += `<div class="${cls}"><span class="bid-cal-day-num">${day.getDate()}</span>${bidsHtml}</div>`;
    }

    grid.innerHTML = cells;
}

function bidCalNav(dir) {
    if (bidCalViewMode === 'month') {
        bidCalMonth += dir;
        if (bidCalMonth < 0) { bidCalMonth = 11; bidCalYear--; }
        if (bidCalMonth > 11) { bidCalMonth = 0; bidCalYear++; }
    } else {
        if (!bidCalWeekStart) bidCalWeekStart = new Date(bidCalYear, bidCalMonth, 1);
        bidCalWeekStart.setDate(bidCalWeekStart.getDate() + (dir * 7));
    }
    renderBidCalendar();
}

function setBidCalView(mode) {
    bidCalViewMode = mode;
    document.getElementById('bid-cal-month-btn').classList.toggle('active', mode === 'month');
    document.getElementById('bid-cal-week-btn').classList.toggle('active', mode === 'week');
    if (mode === 'week' && !bidCalWeekStart) {
        const first = new Date(bidCalYear, bidCalMonth, 1);
        const dow = first.getDay();
        bidCalWeekStart = new Date(bidCalYear, bidCalMonth, 1 - dow);
    }
    renderBidCalendar();
}

function renderOutstandingBidBonds() {
    const thead = document.getElementById('outstanding-bids-head');
    const tbody = document.getElementById('outstanding-bids-body');
    if (!tbody) return;

    const cols = [
        { key: 'bidDate', label: 'Bid Date' },
        { key: 'projectName', label: 'Project Name' },
        { key: 'obligee', label: 'Obligee' },
        { key: 'contractValue', label: 'Contract Value' },
        { key: 'bidBondAmt', label: 'Bid Bond Amt' },
        { key: 'status', label: 'Status' },
        { key: 'doa', label: 'DOA' }
    ];

    const comparators = {
        bidDate: (a, b) => parseDate(a.bidDate) - parseDate(b.bidDate),
        projectName: (a, b) => a.projectName.localeCompare(b.projectName),
        obligee: (a, b) => a.obligee.localeCompare(b.obligee),
        contractValue: (a, b) => a.contractValue - b.contractValue,
        bidBondAmt: (a, b) => a.bidBondAmt - b.bidBondAmt,
        status: (a, b) => a.status.localeCompare(b.status),
        doa: (a, b) => a.doa.localeCompare(b.doa)
    };

    const st = getTableSort('outstandingBids', 'bidDate');
    const outstanding = sampleBidLog.filter(b => b.status === 'Pending Bid' || b.status === 'Approved Bid');
    const sorted = genericSort(outstanding, st.col, st.asc, comparators);

    if (thead) thead.innerHTML = buildSortableHeader('outstandingBids', cols, 'renderOutstandingBidBonds');

    tbody.innerHTML = sorted.map(b => `
        <tr>
            <td>${b.bidDate}</td>
            <td>${b.projectName}</td>
            <td>${b.obligee}</td>
            <td>${fmt(b.contractValue)}</td>
            <td>${fmt(b.bidBondAmt)}</td>
            <td><span class="status-badge ${statusClass(b.status)}">${b.status}</span></td>
            <td><span class="branch-tag-sm">${b.doa}</span></td>
        </tr>
    `).join('');
}

// ==================== REMINDERS: UPCOMING PANEL ====================

function renderUpcomingReminders() {
    const container = document.getElementById('upcoming-reminders-container');
    if (!container) return;

    const active = sampleReminders
        .filter(r => r.status === 'Active')
        .sort((a, b) => {
            const da = new Date(a.date + ' ' + a.time);
            const db = new Date(b.date + ' ' + b.time);
            return da - db;
        });

    if (active.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:24px 0;font-size:13px;">No upcoming reminders. Click "+ Add Reminder" to create one.</p>';
        return;
    }

    let html = '<div style="display:flex;flex-direction:column;gap:10px;padding:4px 0;">';
    active.forEach(r => {
        html += `
        <div style="display:flex;align-items:center;gap:14px;padding:12px 16px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;border-left:4px solid #a855f7;">
            <div style="flex:1;min-width:0;">
                <div style="font-weight:600;font-size:13px;color:#6b21a8;margin-bottom:2px;">${r.title}</div>
                <div style="font-size:12px;color:var(--text-muted);">
                    ${r.date} at ${r.time}${r.account ? ' &bull; <span style="color:var(--text-secondary);">' + r.account + '</span>' : ''}
                </div>
                ${r.notes ? '<div style="font-size:11px;color:var(--text-muted);margin-top:3px;">' + r.notes + '</div>' : ''}
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;">
                <button class="btn btn-outline btn-sm" onclick="markReminderComplete(${r.id})" style="font-size:11px;padding:4px 10px;color:#16a34a;border-color:#16a34a;" title="Mark complete">Done</button>
                <button class="btn btn-outline btn-sm" onclick="openAddReminderModal(${r.id})" style="font-size:11px;padding:4px 10px;" title="Edit">Edit</button>
            </div>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// ==================== REMINDERS: ADD / EDIT / DELETE ====================

function openAddReminderModal(editId) {
    const isEdit = typeof editId === 'number';
    const rem = isEdit ? sampleReminders.find(r => r.id === editId) : null;
    const title = isEdit ? 'Edit Reminder' : 'Add New Reminder';

    const accountOptions = sampleMyAccounts
        .filter(a => a.assignee === currentUser.name)
        .map(a => `<option value="${a.name}" ${rem && rem.account === a.name ? 'selected' : ''}>${a.name}</option>`)
        .join('');

    const body = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div style="grid-column:1/-1;">
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Reminder Title *</label>
            <input type="text" id="rem-title" value="${rem ? rem.title.replace(/"/g,'&quot;') : ''}" placeholder="e.g., Follow up on WIP schedule" style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
        </div>
        <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Date *</label>
            <input type="date" id="rem-date" value="${rem ? (function(d){var p=d.split('/');return p[2]+'-'+p[0].padStart(2,'0')+'-'+p[1].padStart(2,'0');})(rem.date) : ''}" style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
        </div>
        <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Alert Time *</label>
            <input type="time" id="rem-time" value="${rem ? convertTo24(rem.time) : '09:00'}" style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
        </div>
        <div style="grid-column:1/-1;">
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Related Account</label>
            <select id="rem-account" style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
                <option value="">— None (General) —</option>
                ${accountOptions}
            </select>
        </div>
        <div style="grid-column:1/-1;">
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Notes</label>
            <textarea id="rem-notes" rows="3" placeholder="Additional details..." style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;resize:vertical;">${rem ? rem.notes : ''}</textarea>
        </div>
        <div style="grid-column:1/-1;">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                <input type="checkbox" id="rem-alert" ${(!rem || rem.alertOnDashboard) ? 'checked' : ''} style="width:16px;height:16px;">
                <span style="font-size:13px;color:var(--text-primary);">Show alert on My Dashboard</span>
            </label>
        </div>
    </div>`;

    const footer = `
        ${isEdit ? '<button class="btn btn-outline" onclick="deleteReminder('+editId+')" style="color:var(--accent-red);border-color:var(--accent-red);margin-right:auto;">Delete</button>' : ''}
        <button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>
        <button class="btn btn-primary" onclick="submitNewReminder(${isEdit ? editId : 'null'})">${isEdit ? 'Save Changes' : 'Add Reminder'}</button>`;

    openModal(title, body, footer);
}

function convertTo24(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

function convertTo12(time24) {
    let [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ' ' + period;
}

function submitNewReminder(editId) {
    const titleVal = document.getElementById('rem-title').value.trim();
    const dateVal = document.getElementById('rem-date').value;
    const timeVal = document.getElementById('rem-time').value;
    const accountVal = document.getElementById('rem-account').value;
    const notesVal = document.getElementById('rem-notes').value.trim();
    const alertVal = document.getElementById('rem-alert').checked;

    if (!titleVal || !dateVal || !timeVal) {
        showToast('Please fill in Title, Date, and Time', 'error');
        return;
    }

    // Convert date from YYYY-MM-DD to MM/DD/YYYY
    const [y, mo, d] = dateVal.split('-');
    const formattedDate = mo + '/' + d + '/' + y;
    const formattedTime = convertTo12(timeVal);

    if (editId !== null) {
        const rem = sampleReminders.find(r => r.id === editId);
        if (rem) {
            rem.title = titleVal;
            rem.date = formattedDate;
            rem.time = formattedTime;
            rem.account = accountVal;
            rem.notes = notesVal;
            rem.alertOnDashboard = alertVal;
        }
        showToast('Reminder updated successfully');
    } else {
        sampleReminders.push({
            id: nextReminderId++,
            title: titleVal,
            date: formattedDate,
            time: formattedTime,
            account: accountVal,
            notes: notesVal,
            alertOnDashboard: alertVal,
            status: 'Active'
        });
        showToast('Reminder added successfully');
    }

    closeAllModals();
    renderBidCalendar();
    renderUpcomingReminders();
    if (document.getElementById('view-underwriting-home').style.display !== 'none') {
        renderActionItems();
        renderWeekAtGlance();
    }
}

function deleteReminder(remId) {
    const idx = sampleReminders.findIndex(r => r.id === remId);
    if (idx >= 0) {
        sampleReminders.splice(idx, 1);
        showToast('Reminder deleted');
        closeAllModals();
        renderBidCalendar();
        renderUpcomingReminders();
    }
}

function markReminderComplete(remId) {
    const rem = sampleReminders.find(r => r.id === remId);
    if (rem) {
        rem.status = 'Completed';
        showToast('Reminder marked as completed');
        renderBidCalendar();
        renderUpcomingReminders();
        if (document.getElementById('view-underwriting-home').style.display !== 'none') {
            renderActionItems();
            renderWeekAtGlance();
        }
    }
}

// ==================== RENDER: ACCOUNT REVIEW ====================

function renderAccountReviewSummary() {
    const thead = document.getElementById('account-review-head');
    const tbody = document.getElementById('account-review-table-body');

    const cols = [
        { key: 'reviewDate', label: 'Review Date' },
        { key: 'reviewLevel', label: 'Review Level' },
        { key: 'reviewType', label: 'Review Type' },
        { key: 'fsDate', label: 'FS Date' },
        { key: 'reviewState', label: 'Review State' },
        { key: 'currentQueue', label: 'Current Queue' },
        { key: 'reviewedBy', label: 'Reviewed By' },
        { key: 'reviewRating', label: 'Review Rating' },
        { key: 'viewEdit', label: 'View/Edit', sortable: false },
        { key: 'notes', label: 'Notes', sortable: false },
        { key: 'report', label: 'Generate Report', sortable: false },
        { key: 'delete', label: 'Delete', sortable: false }
    ];

    const comparators = {
        reviewDate: (a, b) => parseDate(a.reviewDate) - parseDate(b.reviewDate),
        reviewLevel: (a, b) => a.reviewLevel.localeCompare(b.reviewLevel),
        reviewType: (a, b) => a.reviewType.localeCompare(b.reviewType),
        fsDate: (a, b) => parseDate(a.fsDate) - parseDate(b.fsDate),
        reviewState: (a, b) => a.reviewState.localeCompare(b.reviewState),
        currentQueue: (a, b) => (a.currentQueue || '').localeCompare(b.currentQueue || ''),
        reviewedBy: (a, b) => a.reviewedBy.localeCompare(b.reviewedBy),
        reviewRating: (a, b) => a.reviewRating.localeCompare(b.reviewRating)
    };

    const st = getTableSort('accountReview', 'reviewDate');
    const sorted = genericSort(sampleAccountReviews, st.col, st.asc, comparators);

    if (thead) thead.innerHTML = buildSortableHeader('accountReview', cols, 'renderAccountReviewSummary');

    tbody.innerHTML = sorted.map((r) => {
        const i = sampleAccountReviews.indexOf(r);
        return `
        <tr>
            <td>${r.reviewDate}</td>
            <td><span class="branch-tag-sm">${r.reviewLevel}</span></td>
            <td>${r.reviewType}</td>
            <td>${r.fsDate}</td>
            <td><span class="status-badge ${statusClass(r.reviewState)}">${r.reviewState}</span></td>
            <td>${r.currentQueue ? (r.currentQueue === currentUser.name ? '<span class="queue-badge queue-you">In Your Queue</span>' : '<span class="queue-badge queue-other">' + r.currentQueue + ' (' + (chainTitles[r.currentQueue] || '') + ')</span>') + queueAgeHTML(r.queueEnteredDate) : '<span class="queue-badge" style="opacity:.5">Completed</span>'}</td>
            <td>${r.reviewedBy}</td>
            <td>${r.reviewRating}</td>
            <td><button class="action-btn" onclick="openARDetail(${i})">View</button></td>
            <td><button class="action-btn" onclick="openARNotes(${i})">Notes</button></td>
            <td><button class="action-btn" onclick="simulateReportGenerate('Account Review — ${r.reviewDate}')">Report</button></td>
            <td><button class="action-btn delete-btn" onclick="openDeleteConfirm('account review', '${r.reviewDate}', 'deleteAccountReview(${i})')">Del</button></td>
        </tr>`;
    }).join('');
}

function renderARSectionNav() {
    const nav = document.getElementById('ar-section-nav');
    nav.innerHTML = arSections.map((s, i) => `
        <div class="secondary-nav-item ${i === 0 ? 'active' : ''}" data-section="${s.id}" onclick="switchARSection('${s.id}', this)">
            <span class="nav-check ${s.complete ? 'complete' : ''}">${s.complete ? '&#10003;' : ''}</span>
            <span>${s.label}</span>
        </div>
    `).join('');
}

function switchARSection(sectionId, el) {
    document.querySelectorAll('.secondary-nav-item').forEach(n => n.classList.remove('active'));
    if (el) el.classList.add('active');
    renderARSectionContent(sectionId);
}

function renderARSectionContent(sectionId) {
    const content = document.getElementById('ar-section-content');
    const sectionContent = getARSectionHTML(sectionId);
    content.innerHTML = sectionContent;
}

function getARSectionHTML(sectionId) {
    switch (sectionId) {
        case 'ar-info': {
            const infoReview = sampleAccountReviews[currentARIndex];
            const signOffRows = (infoReview.signOffHistory || []).map(h => `
                <tr>
                    <td>${h.reviewer}</td>
                    <td><span class="branch-tag-sm">${h.title}</span></td>
                    <td>${h.action}</td>
                    <td>${h.date}</td>
                    <td><span class="status-badge ${statusClass(h.state)}">${h.state}</span></td>
                    <td>${h.comments || ''}</td>
                </tr>`).join('');
            const queueDisplay = infoReview.currentQueue
                ? (infoReview.currentQueue === currentUser.name
                    ? '<span class="queue-badge queue-you">In Your Queue</span>'
                    : '<span class="queue-badge queue-other">' + infoReview.currentQueue + ' (' + (chainTitles[infoReview.currentQueue] || '') + ')</span>') + queueAgeHTML(infoReview.queueEnteredDate)
                : '<span class="queue-badge" style="opacity:.5">Completed</span>';
            const triggeringFS = infoReview.triggeringStatementId || '—';
            const deadlineHTML = arrDeadlineHTML(infoReview.fsDateReceived);
            const acctName = 'R.J. Corman Railroad Group';
            const freqHTML = frequencyBadgeHTML(acctName);
            return `
            <div class="section-title">Account Review Info / Sign-Off History</div>
            <div class="detail-grid" style="margin-bottom:20px;">
                <div class="detail-item"><div class="detail-label">Account Name</div><div class="detail-value">R.J. Corman Railroad Group</div></div>
                <div class="detail-item"><div class="detail-label">Customer Number</div><div class="detail-value">0008397740</div></div>
                <div class="detail-item"><div class="detail-label">Review Type</div><div class="detail-value">${infoReview.reviewType}</div></div>
                <div class="detail-item"><div class="detail-label">Review Level</div><div class="detail-value">${infoReview.reviewLevel}</div></div>
                <div class="detail-item"><div class="detail-label">Financial Statement Date</div><div class="detail-value">${infoReview.fsDate}</div></div>
                <div class="detail-item"><div class="detail-label">Current Queue</div><div class="detail-value">${queueDisplay}</div></div>
                <div class="detail-item"><div class="detail-label">Triggering FS (BR-1)</div><div class="detail-value">${triggeringFS}</div></div>
                <div class="detail-item"><div class="detail-label">FS Date Received</div><div class="detail-value">${infoReview.fsDateReceived || '—'}</div></div>
                <div class="detail-item"><div class="detail-label">14-Day Deadline (FR-3)</div><div class="detail-value">${deadlineHTML}</div></div>
                <div class="detail-item"><div class="detail-label">Review Frequency (BR-4)</div><div class="detail-value">${freqHTML}</div></div>
            </div>
            <h3 style="font-size:14px; margin-bottom:12px;">Sign-Off History</h3>
            <div class="table-container" style="margin-bottom:16px;">
                <table class="data-table"><thead><tr><th>Reviewer</th><th>Title</th><th>Action</th><th>Date</th><th>State</th><th>Comments</th></tr></thead>
                <tbody>${signOffRows || '<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No sign-off history yet</td></tr>'}</tbody></table>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Account Review Info as Complete</label></div>`;
        }

        case 'background': return `
            <div class="section-title">Background & Experience</div>
            <div class="detail-grid" style="margin-bottom:20px;">
                <div class="detail-item"><div class="detail-label">Year Established</div><div class="detail-value">1973</div></div>
                <div class="detail-item"><div class="detail-label">Years in Business</div><div class="detail-value">51</div></div>
                <div class="detail-item"><div class="detail-label">Entity Type</div><div class="detail-value">Corporation</div></div>
                <div class="detail-item"><div class="detail-label">State of Formation</div><div class="detail-value">Kentucky</div></div>
                <div class="detail-item"><div class="detail-label">Primary Business</div><div class="detail-value">Railroad Services / Heavy Construction</div></div>
                <div class="detail-item"><div class="detail-label">SIC Code</div><div class="detail-value">1611 - Highway & Street Construction</div></div>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Background Notes</label>
                <textarea class="form-textarea" rows="4">R.J. Corman Railroad Group is a family of companies providing railroad services including emergency response, construction, track maintenance, and short line railroad operations. Strong presence in the Southeast and Midwest regions with established relationships with Class I railroads.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox" checked> Mark Background & Experience as Complete</label></div>`;

        case 'operations': return `
            <div class="section-title">Operations</div>
            <div class="detail-grid" style="margin-bottom:20px;">
                <div class="detail-item"><div class="detail-label">Geographic Area</div><div class="detail-value">Southeast, Midwest, Mid-Atlantic</div></div>
                <div class="detail-item"><div class="detail-label">Type of Work</div><div class="detail-value">Railroad, Heavy/Highway, Specialty</div></div>
                <div class="detail-item"><div class="detail-label">Primary Obligees</div><div class="detail-value">State DOTs, CSX, Norfolk Southern, Railroads</div></div>
                <div class="detail-item"><div class="detail-label">% Government</div><div class="detail-value">35%</div></div>
                <div class="detail-item"><div class="detail-label">% Private</div><div class="detail-value">65%</div></div>
                <div class="detail-item"><div class="detail-label">Largest Single Project</div><div class="detail-value">$6,200,000</div></div>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Operations Notes</label>
                <textarea class="form-textarea" rows="3">Operations diversified across railroad services and heavy construction. Steady backlog growth year-over-year. No significant concentration risk in customer base.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox" checked> Mark Operations as Complete</label></div>`;

        case 'work-on-hand': return `
            <div class="section-title">Work on Hand</div>
            <div class="section-subtitle">Current backlog and LOA information</div>
            <h3 style="font-size:14px; margin-bottom:12px;">Letters of Authority</h3>
            <div class="table-container" style="margin-bottom:20px;">
                <table class="data-table"><thead><tr><th>Type</th><th>Eff. Date</th><th>Exp. Date</th><th>Single</th><th>Aggregate</th><th>Status</th></tr></thead>
                <tbody>${sampleLOAs.map(l => `<tr><td>${l.type}</td><td>${l.effDate}</td><td>${l.expDate}</td><td>${fmt(l.single)}</td><td>${fmt(l.aggregate)}</td><td><span class="status-badge ${statusClass(getLOAStatus(l))}">${getLOAStatus(l)}</span></td></tr>`).join('')}</tbody></table>
            </div>
            <h3 style="font-size:14px; margin-bottom:12px;">Backlog Analysis</h3>
            <div class="detail-grid" style="margin-bottom:16px;">
                <div class="detail-item"><div class="detail-label">Current Bonded Backlog</div><div class="detail-value">$8,750,000</div></div>
                <div class="detail-item"><div class="detail-label">Largest Bond Outstanding</div><div class="detail-value">$3,200,000</div></div>
                <div class="detail-item"><div class="detail-label">Active Bonds</div><div class="detail-value">6</div></div>
                <div class="detail-item"><div class="detail-label">Aggregate Utilization</div><div class="detail-value">58.3%</div></div>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Work on Hand Notes</label>
                <textarea class="form-textarea" rows="3">Backlog remains healthy. Aggregate utilization within acceptable limits. LOA renewal due 12/31/2024 — discuss potential increase based on new project pipeline.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Work on Hand as Complete</label></div>`;

        case 'key-personnel': return `
            <div class="section-title">Key Personnel</div>
            <div class="table-container" style="margin-bottom:16px;">
                <table class="data-table"><thead><tr><th>Name</th><th>Title</th><th>Years with Company</th><th>Ownership %</th></tr></thead>
                <tbody>
                    <tr><td>Rick Corman</td><td>Chairman & CEO</td><td>51</td><td>100%</td></tr>
                    <tr><td>Ed Quinn</td><td>President & COO</td><td>18</td><td>0%</td></tr>
                    <tr><td>Beth Johnson</td><td>CFO</td><td>12</td><td>0%</td></tr>
                    <tr><td>Mark Stevens</td><td>VP of Construction</td><td>15</td><td>0%</td></tr>
                </tbody></table>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Key Personnel Notes</label>
                <textarea class="form-textarea" rows="3">Stable management team with long tenure. Rick Corman provides strong leadership. Succession plan in place with Ed Quinn as designated successor.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Key Personnel as Complete</label></div>`;

        case 'indemnitors': return `
            <div class="section-title">Indemnitors</div>
            <div class="table-container" style="margin-bottom:16px;">
                <table class="data-table"><thead><tr><th>Name</th><th>Type</th><th>Net Worth</th><th>Liquid Assets</th><th>Indemnity Date</th></tr></thead>
                <tbody>
                    <tr><td>Rick Corman</td><td>Personal</td><td>$12,500,000</td><td>$3,200,000</td><td>01/15/2024</td></tr>
                    <tr><td>R.J. Corman Railroad Group, LLC</td><td>Corporate</td><td>$28,000,000</td><td>$8,500,000</td><td>01/15/2024</td></tr>
                </tbody></table>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Indemnitor Notes</label>
                <textarea class="form-textarea" rows="3">Corporate and personal indemnity in place. Personal net worth provides adequate backstop. Indemnity agreements current.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Indemnitors as Complete</label></div>`;

        case 'affiliates': return `
            <div class="section-title">Affiliates</div>
            <div class="table-container" style="margin-bottom:16px;">
                <table class="data-table"><thead><tr><th>Affiliate Name</th><th>Relationship</th><th>Business Type</th><th>Active Bonds</th></tr></thead>
                <tbody>
                    <tr><td>R.J. Corman Railroad Services</td><td>Subsidiary</td><td>Railroad Maintenance</td><td>2</td></tr>
                    <tr><td>R.J. Corman Material Sales</td><td>Subsidiary</td><td>Ballast & Materials</td><td>0</td></tr>
                    <tr><td>R.J. Corman Real Estate</td><td>Affiliate</td><td>Property Holding</td><td>0</td></tr>
                </tbody></table>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Affiliates Notes</label>
                <textarea class="form-textarea" rows="3">Multiple related entities under common ownership. Railroad Services subsidiary carries 2 active bonds. No intercompany guarantees of concern.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Affiliates as Complete</label></div>`;

        case 'credit': return `
            <div class="section-title">Credit</div>
            <div class="detail-grid" style="margin-bottom:20px;">
                <div class="detail-item"><div class="detail-label">D&B Rating</div><div class="detail-value">4A2</div></div>
                <div class="detail-item"><div class="detail-label">D&B PAYDEX Score</div><div class="detail-value">78</div></div>
                <div class="detail-item"><div class="detail-label">Commercial Score</div><div class="detail-value">72</div></div>
                <div class="detail-item"><div class="detail-label">Financial Stress Score</div><div class="detail-value">1,486 (Low Risk)</div></div>
                <div class="detail-item"><div class="detail-label">Credit Report Date</div><div class="detail-value">02/15/2024</div></div>
                <div class="detail-item"><div class="detail-label">Bankruptcy / Liens / Judgments</div><div class="detail-value">None</div></div>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Credit Notes</label>
                <textarea class="form-textarea" rows="3">Credit profile remains strong. PAYDEX of 78 indicates payments generally within terms. No derogatory information. D&B rating stable year-over-year.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox" checked> Mark Credit as Complete</label></div>`;

        case 'bank-lines': return `
            <div class="section-title">Bank Lines</div>
            <div class="table-container" style="margin-bottom:16px;">
                <table class="data-table"><thead><tr><th>Bank</th><th>Type</th><th>Limit</th><th>Outstanding</th><th>Available</th><th>Maturity</th></tr></thead>
                <tbody>
                    <tr><td>JPMorgan Chase</td><td>Revolving LOC</td><td>$5,000,000</td><td>$1,200,000</td><td>$3,800,000</td><td>06/30/2025</td></tr>
                    <tr><td>PNC Bank</td><td>Equipment Line</td><td>$2,000,000</td><td>$800,000</td><td>$1,200,000</td><td>12/31/2024</td></tr>
                </tbody></table>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Bank Lines Notes</label>
                <textarea class="form-textarea" rows="3">Adequate banking relationships. Revolving line provides working capital support. Equipment line used for fleet maintenance and upgrades.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Bank Lines as Complete</label></div>`;

        case 'financial-summary': return `
            <div class="section-title">Financial Summary / Red Flags</div>
            <div class="detail-grid" style="margin-bottom:20px;">
                <div class="detail-item"><div class="detail-label">Revenue (FY2023)</div><div class="detail-value">$42,800,000</div></div>
                <div class="detail-item"><div class="detail-label">Net Income</div><div class="detail-value">$3,150,000</div></div>
                <div class="detail-item"><div class="detail-label">Working Capital</div><div class="detail-value">$8,200,000</div></div>
                <div class="detail-item"><div class="detail-label">Net Worth</div><div class="detail-value">$28,000,000</div></div>
                <div class="detail-item"><div class="detail-label">Current Ratio</div><div class="detail-value">1.85</div></div>
                <div class="detail-item"><div class="detail-label">Debt-to-Equity</div><div class="detail-value">0.42</div></div>
            </div>
            <h3 style="font-size:14px; margin-bottom:12px;">Red Flags</h3>
            <div style="padding:12px; background:var(--bg-secondary); border-radius:var(--radius-sm); border-left:3px solid var(--accent-green); margin-bottom:16px; font-size:13px;">No significant red flags identified. Financial trends positive over the past 3 fiscal years.</div>
            <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label">Financial Summary Notes</label>
                <textarea class="form-textarea" rows="3">Financials show continued improvement. Revenue up 8% YoY. Working capital adequate for current backlog. Net worth provides strong equity cushion.</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Financial Summary as Complete</label></div>`;

        case 'risks-recs': return `
            <div class="section-title">Risks / Reqs. / Recommendations</div>
            <h3 style="font-size:14px; margin-bottom:12px;">Identified Risks</h3>
            <div class="form-group" style="margin-bottom:16px;">
                <textarea class="form-textarea" rows="3">1. Key-man dependency on Rick Corman (CEO/100% owner)
2. Equipment fleet aging — capex requirements increasing
3. Railroad industry cyclicality tied to Class I capital spending</textarea>
            </div>
            <h3 style="font-size:14px; margin-bottom:12px;">Requirements</h3>
            <div class="form-group" style="margin-bottom:16px;">
                <textarea class="form-textarea" rows="3">1. Annual audited financial statements required within 120 days of FYE
2. WIP schedule required annually
3. Personal financial statement from Rick Corman annually
4. Notify surety of management changes</textarea>
            </div>
            <h3 style="font-size:14px; margin-bottom:12px;">Recommendations</h3>
            <div class="form-group" style="margin-bottom:16px;">
                <textarea class="form-textarea" rows="3">1. Recommend LOA renewal at current limits ($5M/$15M)
2. Consider Single limit increase to $7M based on successful Highway 50 project
3. Request updated succession plan documentation
4. Monitor equipment capex vs. depreciation trends</textarea>
            </div>
            <div class="mark-complete"><label class="form-check"><input type="checkbox"> Mark Risks / Reqs. / Recommendations as Complete</label></div>`;

        case 'sign-off': {
            const soReview = sampleAccountReviews[currentARIndex];
            const uw = soReview.originatingUW || currentUser.name;
            const chain = reviewChains[uw] || [];
            const fullChain = [uw, ...chain];
            const currentQ = soReview.currentQueue;
            const currentIdx = fullChain.indexOf(currentQ);
            const nextReviewer = (currentIdx >= 0 && currentIdx < fullChain.length - 1) ? fullChain[currentIdx + 1] : null;
            const isCompleted = !currentQ;
            const chainHTML = fullChain.map((person, ci) => {
                const title = chainTitles[person] || '';
                const isActive = person === currentQ;
                const isPast = currentQ ? fullChain.indexOf(currentQ) > ci : true;
                const isFuture = currentQ ? fullChain.indexOf(currentQ) < ci : false;
                let stepClass = 'chain-step';
                if (isActive) stepClass += ' chain-active';
                else if (isPast) stepClass += ' chain-done';
                else if (isFuture) stepClass += ' chain-future';
                if (isCompleted) stepClass = 'chain-step chain-done';
                return `<div class="${stepClass}">
                    <div class="chain-dot"></div>
                    <div class="chain-label">${person}</div>
                    <div class="chain-title">${title}</div>
                </div>`;
            }).join('<div class="chain-connector"></div>');
            const promoteLabel = nextReviewer
                ? `Approve &amp; Promote to ${nextReviewer} (${chainTitles[nextReviewer] || ''})`
                : (isCompleted ? 'Review Complete' : 'Final Approval');
            const promoteDisabled = isCompleted ? 'disabled' : '';
            const soAcctName = 'R.J. Corman Railroad Group';
            const soFreq = getRequiredFrequency(soAcctName);
            const freqOptions = ['Annual', 'Semi-Annual', 'Quarterly'].map(f =>
                `<option${f === soFreq.frequency ? ' selected' : ''}>${f}</option>`
            ).join('');
            const overrideIndicator = soFreq.source === 'Override'
                ? `<div style="margin-top:6px; font-size:11px; color:#e65100;">⚠ Override by ${soFreq.override.approver} (${soFreq.override.approvalDate}): ${soFreq.override.rationale}</div>`
                : '';
            return `
            <div class="section-title">Sign-Off and Promote Review</div>
            <h3 style="font-size:13px; margin-bottom:12px; color:var(--text-muted);">Review Chain of Command</h3>
            <div class="chain-of-command">${chainHTML}</div>
            <div class="form-grid" style="margin-bottom:20px; margin-top:20px;">
                <div class="form-group">
                    <label class="form-label">Account Grade</label>
                    <select class="form-select"><option>Select Grade...</option><option selected>Acceptable</option><option>Marginal</option><option>Substandard</option><option>Declined</option></select>
                </div>
                <div class="form-group">
                    <label class="form-label">Account Review Frequency (BR-4)</label>
                    <select class="form-select">${freqOptions}</select>
                    ${overrideIndicator}
                    <button class="btn btn-outline btn-sm" style="margin-top:6px;" onclick="openFrequencyOverrideModal()">Request Frequency Override</button>
                </div>
            </div>
            <div class="form-group" style="margin-bottom:20px;">
                <label class="form-label">Overall Review Comments</label>
                <textarea class="form-textarea" rows="4">R.J. Corman Railroad Group continues to demonstrate strong financial performance and operational capabilities. The account remains within acceptable risk parameters. Recommend continuation at current LOA limits with consideration for a modest increase.</textarea>
            </div>
            <div class="form-group" style="margin-bottom:20px;">
                <label class="form-label">Additional / Supervisor Review Required</label>
                <select class="form-select" style="max-width:300px;">
                    <option>No Additional Review Required</option>
                    <option>Additional Underwriter Review Required</option>
                    <option>Supervisor Review Required</option>
                </select>
            </div>
            <div style="display:flex; gap:8px; padding-top:16px; border-top:1px solid var(--border-color);">
                <button class="btn btn-primary" ${promoteDisabled} onclick="promoteReview(${currentARIndex})">${promoteLabel}</button>
                <button class="btn btn-outline" onclick="openReassignModal()">Reassign Review</button>
                <button class="btn btn-outline">Save Draft</button>
            </div>`;
        }

        default: return `<div class="section-title">Section</div><p style="color:var(--text-muted);">Content loading...</p>`;
    }
}

// ==================== RENDER: BONDS ====================

let lastBondsData = null;

function renderBonds(data) {
    const bonds = data || lastBondsData || sampleBonds;
    lastBondsData = bonds;
    const thead = document.getElementById('bonds-head');
    const tbody = document.getElementById('bonds-table-body');

    const cols = [
        { key: 'bondNumber', label: 'Bond Number' },
        { key: 'principal', label: 'Principal' },
        { key: 'bondType', label: 'Bond Type' },
        { key: 'amount', label: 'Amount' },
        { key: 'effectiveDate', label: 'Effective Date' },
        { key: 'expirationDate', label: 'Expiration Date' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const comparators = {
        bondNumber: (a, b) => a.bondNumber.localeCompare(b.bondNumber),
        principal: (a, b) => a.principal.localeCompare(b.principal),
        bondType: (a, b) => a.bondType.localeCompare(b.bondType),
        amount: (a, b) => parseCurrency(a.amount) - parseCurrency(b.amount),
        effectiveDate: (a, b) => parseDate(a.effectiveDate) - parseDate(b.effectiveDate),
        expirationDate: (a, b) => parseDate(a.expirationDate) - parseDate(b.expirationDate),
        status: (a, b) => a.status.localeCompare(b.status)
    };

    const st = getTableSort('bonds', 'bondNumber');
    const sorted = genericSort(bonds, st.col, st.asc, comparators);

    if (thead) thead.innerHTML = buildSortableHeader('bonds', cols, 'renderBonds');

    tbody.innerHTML = sorted.map((b) => {
        const idx = sampleBonds.indexOf(b);
        return `
        <tr id="bond-row-${b.bondNumber}">
            <td><span class="clickable-cell" onclick="openBondDetail(${idx})">${b.bondNumber}</span></td>
            <td>${accountLink(b.principal)}</td>
            <td>${b.bondType}</td>
            <td>${b.amount}</td>
            <td>${b.effectiveDate}</td>
            <td>${b.expirationDate}</td>
            <td><span class="status-badge ${statusClass(b.status)}">${b.status}</span></td>
            <td><button class="action-btn" onclick="openBondDetail(${idx})">View</button></td>
        </tr>`;
    }).join('');
}

function filterBonds(status, tabEl) {
    document.querySelectorAll('#view-bonds .tab-group .tab').forEach(t => t.classList.remove('active'));
    if (tabEl) tabEl.classList.add('active');
    let filtered = sampleBonds;
    if (status === 'Active') filtered = sampleBonds.filter(b => b.status === 'Active');
    else if (status === 'Expiring Soon') filtered = sampleBonds.filter(b => b.status === 'Expiring Soon');
    else if (status === 'Expired') filtered = sampleBonds.filter(b => b.status === 'Expired');
    renderBonds(filtered);
}

function openBondDetail(idx) {
    const b = sampleBonds[idx];
    const body = `
        <div class="detail-grid" style="margin-bottom:20px;">
            <div class="detail-item"><div class="detail-label">Bond Number</div><div class="detail-value">${b.bondNumber}</div></div>
            <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value"><span class="status-badge ${statusClass(b.status)}">${b.status}</span></div></div>
            <div class="detail-item"><div class="detail-label">Principal</div><div class="detail-value">${b.principal}</div></div>
            <div class="detail-item"><div class="detail-label">Bond Type</div><div class="detail-value">${b.bondType}</div></div>
            <div class="detail-item"><div class="detail-label">Bond Amount</div><div class="detail-value">${b.amount}</div></div>
            <div class="detail-item"><div class="detail-label">Effective Date</div><div class="detail-value">${b.effectiveDate}</div></div>
            <div class="detail-item"><div class="detail-label">Expiration Date</div><div class="detail-value">${b.expirationDate}</div></div>
            <div class="detail-item"><div class="detail-label">Underwriter</div><div class="detail-value">Jake Miller</div></div>
        </div>
        <h3 style="font-size:14px; margin-bottom:10px;">Bond History</h3>
        <div class="table-container">
            <table class="data-table"><thead><tr><th>Date</th><th>Action</th><th>User</th><th>Notes</th></tr></thead>
            <tbody>
                <tr><td>${b.effectiveDate}</td><td>Bond Issued</td><td>Jake Miller</td><td>Original issuance</td></tr>
                <tr><td>${b.effectiveDate}</td><td>Premium Recorded</td><td>System</td><td>Premium posted to account</td></tr>
            </tbody></table>
        </div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Close</button>`;
    openModal('Bond Detail — ' + b.bondNumber, body, footer);
    document.getElementById('modal-container').style.maxWidth = '740px';
}

function navigateToBond(bondNumber) {
    closeAllModals();
    navigateTo('bonds');
    // Reset to "All" tab and re-render so the bond is visible
    document.querySelectorAll('#view-bonds .tab-group .tab').forEach(t => t.classList.remove('active'));
    const allTab = document.querySelector('#view-bonds .tab-group .tab');
    if (allTab) allTab.classList.add('active');
    renderBonds(sampleBonds);
    // Scroll to and highlight the bond row
    setTimeout(function() {
        var row = document.getElementById('bond-row-' + bondNumber);
        if (row) {
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            row.style.transition = 'background 0.3s ease';
            row.style.background = '#eff6ff';
            setTimeout(function() { row.style.background = ''; }, 2500);
        }
        // Open bond detail modal
        var idx = sampleBonds.findIndex(function(b) { return b.bondNumber === bondNumber; });
        if (idx >= 0) openBondDetail(idx);
    }, 150);
}

// ==================== RENDER: CLAIMS ====================

let lastClaimsData = null;

function renderClaims(data) {
    const claims = data || lastClaimsData || sampleClaims;
    lastClaimsData = claims;
    const thead = document.getElementById('claims-head');
    const tbody = document.getElementById('claims-table-body');

    const cols = [
        { key: 'claimNumber', label: 'Claim Number' },
        { key: 'bondNumber', label: 'Bond Number' },
        { key: 'principal', label: 'Principal' },
        { key: 'claimant', label: 'Claimant' },
        { key: 'amount', label: 'Amount' },
        { key: 'filedDate', label: 'Filed Date' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const comparators = {
        claimNumber: (a, b) => a.claimNumber.localeCompare(b.claimNumber),
        bondNumber: (a, b) => a.bondNumber.localeCompare(b.bondNumber),
        principal: (a, b) => a.principal.localeCompare(b.principal),
        claimant: (a, b) => a.claimant.localeCompare(b.claimant),
        amount: (a, b) => parseCurrency(a.amount) - parseCurrency(b.amount),
        filedDate: (a, b) => parseDate(a.filedDate) - parseDate(b.filedDate),
        status: (a, b) => a.status.localeCompare(b.status)
    };

    const st = getTableSort('claims', 'filedDate');
    const sorted = genericSort(claims, st.col, st.asc, comparators);

    if (thead) thead.innerHTML = buildSortableHeader('claims', cols, 'renderClaims');

    tbody.innerHTML = sorted.map(c => {
        const idx = sampleClaims.indexOf(c);
        return `
        <tr>
            <td><span class="clickable-cell" onclick="openClaimDetail(${idx})">${c.claimNumber}</span></td>
            <td>${c.bondNumber}</td>
            <td>${accountLink(c.principal)}</td>
            <td>${c.claimant}</td>
            <td>${c.amount}</td>
            <td>${c.filedDate}</td>
            <td><span class="status-badge ${statusClass(c.status)}">${c.status}</span></td>
            <td><button class="action-btn" onclick="openClaimDetail(${idx})">View</button></td>
        </tr>`;
    }).join('');
}

function filterClaims(status, tabEl) {
    document.querySelectorAll('#view-claims .tab-group .tab').forEach(t => t.classList.remove('active'));
    if (tabEl) tabEl.classList.add('active');
    let filtered = sampleClaims;
    if (status === 'Open') filtered = sampleClaims.filter(c => c.status !== 'Closed');
    else if (status === 'Closed') filtered = sampleClaims.filter(c => c.status === 'Closed');
    renderClaims(filtered);
}

function openClaimDetail(idx) {
    const c = sampleClaims[idx];
    const body = `
        <div class="detail-grid" style="margin-bottom:20px;">
            <div class="detail-item"><div class="detail-label">Claim Number</div><div class="detail-value">${c.claimNumber}</div></div>
            <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value"><span class="status-badge ${statusClass(c.status)}">${c.status}</span></div></div>
            <div class="detail-item"><div class="detail-label">Bond Number</div><div class="detail-value">${c.bondNumber}</div></div>
            <div class="detail-item"><div class="detail-label">Principal</div><div class="detail-value">${c.principal}</div></div>
            <div class="detail-item"><div class="detail-label">Claimant</div><div class="detail-value">${c.claimant}</div></div>
            <div class="detail-item"><div class="detail-label">Claim Amount</div><div class="detail-value">${c.amount}</div></div>
            <div class="detail-item"><div class="detail-label">Filed Date</div><div class="detail-value">${c.filedDate}</div></div>
            <div class="detail-item"><div class="detail-label">Assigned To</div><div class="detail-value">Jake Miller</div></div>
        </div>
        <h3 style="font-size:14px; margin-bottom:10px;">Claim Activity</h3>
        <div class="table-container">
            <table class="data-table"><thead><tr><th>Date</th><th>Action</th><th>User</th><th>Notes</th></tr></thead>
            <tbody>
                <tr><td>${c.filedDate}</td><td>Claim Filed</td><td>System</td><td>Claim received from ${c.claimant}</td></tr>
                <tr><td>${c.filedDate}</td><td>Investigation Opened</td><td>Jake Miller</td><td>Assigned for investigation</td></tr>
            </tbody></table>
        </div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Close</button>`;
    openModal('Claim Detail — ' + c.claimNumber, body, footer);
    document.getElementById('modal-container').style.maxWidth = '740px';
}

// ==================== RENDER: PORTFOLIO ANALYSIS ====================

function renderPortfolioAnalysis(branchFilter) {
    if (!branchFilter) branchFilter = 'all';
    const grades = ALL_GRADES;
    const gradeGroups = ['A', 'B', 'C'];
    const gradeGroupColors = { A: 'var(--accent-green)', B: 'var(--accent-blue)', C: 'var(--accent-orange)' };
    const gradeGroupColorNames = { A: 'green', B: 'blue', C: 'orange' };
    const gradeGroupLabels = { A: 'A Range (A+/A/A-)', B: 'B Range (B+/B/B-)', C: 'C Range (C+/C/C-)' };

    // Territory-based access filtering: non-admin users only see their own accounts
    const accessibleARRs = canSeeAllTerritories() ? sampleARRs : sampleARRs.filter(a => a.assignee === currentUser.name);

    // Update subtitle to reflect territory context
    const subtitle = document.querySelector('#view-portfolio-analysis .view-subtitle');
    if (subtitle) {
        const territory = getUserTerritory();
        subtitle.textContent = canSeeAllTerritories() ? 'Grade distribution by branch' : `Grade distribution — ${territory ? territory.name + ' Territory' : currentUser.name}`;
    }

    // Populate branch filter dropdown (preserve selection)
    const select = document.getElementById('portfolio-branch-filter');
    const branches = [...new Set(accessibleARRs.map(a => a.branch))].sort();
    if (select && select.options.length <= 1) {
        branches.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b;
            opt.textContent = b;
            select.appendChild(opt);
        });
    }
    if (select) select.value = branchFilter;

    // Filter data
    const filtered = branchFilter === 'all' ? accessibleARRs : accessibleARRs.filter(a => a.branch === branchFilter);
    const total = filtered.length;

    // Count per grade and per grade group
    const gradeCounts = {};
    grades.forEach(g => gradeCounts[g] = filtered.filter(a => a.grade === g).length);
    const groupCounts = { A: 0, B: 0, C: 0 };
    filtered.forEach(a => { const g = getGradeGroup(a.grade); if (groupCounts[g] !== undefined) groupCounts[g]++; });

    // KPI cards
    const kpiContainer = document.getElementById('portfolio-kpi-cards');
    if (kpiContainer) {
        const pKpiStyle = 'cursor:pointer;transition:transform 0.15s ease,box-shadow 0.15s ease;';
        const pKpiHover = '" onmouseenter="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(0,0,0,0.1)\'" onmouseleave="this.style.transform=\'none\';this.style.boxShadow=\'none\'';
        kpiContainer.innerHTML = `
            <div class="portfolio-kpi-card" style="${pKpiStyle}" onclick="openPortfolioKPIDrillDown('all')${pKpiHover}"><div class="portfolio-kpi-label">Total Accounts</div><div class="portfolio-kpi-value">${total}</div></div>
            <div class="portfolio-kpi-card" style="${pKpiStyle}" onclick="openPortfolioKPIDrillDown('A')${pKpiHover}"><div class="portfolio-kpi-label">A Range</div><div class="portfolio-kpi-value green">${total ? Math.round(groupCounts.A / total * 100) : 0}%</div></div>
            <div class="portfolio-kpi-card" style="${pKpiStyle}" onclick="openPortfolioKPIDrillDown('B')${pKpiHover}"><div class="portfolio-kpi-label">B Range</div><div class="portfolio-kpi-value blue">${total ? Math.round(groupCounts.B / total * 100) : 0}%</div></div>
            <div class="portfolio-kpi-card" style="${pKpiStyle}" onclick="openPortfolioKPIDrillDown('C')${pKpiHover}"><div class="portfolio-kpi-label">C Range</div><div class="portfolio-kpi-value orange">${total ? Math.round(groupCounts.C / total * 100) : 0}%</div></div>
        `;
    }

    // Donut Pie Chart
    const chartContainer = document.getElementById('portfolio-chart');
    if (chartContainer) {
        const radius = 90;
        const strokeWidth = 36;
        const circumference = 2 * Math.PI * radius;
        const svgSize = (radius + strokeWidth) * 2;
        const center = svgSize / 2;

        // Build segments by grade group (A, B, C)
        let offset = 0;
        const segments = gradeGroups.map(g => {
            const count = groupCounts[g];
            const pct = total ? (count / total * 100) : 0;
            const dashLen = circumference * pct / 100;
            const seg = { grade: g, count, pct, dashLen, offset };
            offset += dashLen;
            return seg;
        }).filter(s => s.count > 0);

        const donutSVG = `
            <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
                <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--bg-primary)" stroke-width="${strokeWidth}"/>
                ${segments.map(s => `
                    <circle class="pie-segment" cx="${center}" cy="${center}" r="${radius}" fill="none"
                        stroke="${gradeGroupColors[s.grade]}" stroke-width="${strokeWidth}"
                        stroke-dasharray="${s.dashLen} ${circumference - s.dashLen}"
                        stroke-dashoffset="${circumference - s.offset}"
                        transform="rotate(-90 ${center} ${center})"
                        data-grade="${s.grade}" data-label="${gradeGroupLabels[s.grade]}"
                        data-count="${s.count}" data-pct="${s.pct.toFixed(1)}"
                        style="transition: stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease"/>
                `).join('')}
            </svg>
        `;

        const legendHTML = gradeGroups.map(g => {
            const count = groupCounts[g];
            const pct = total ? Math.round(count / total * 100) : 0;
            return `<div class="portfolio-pie-legend-item" style="cursor:pointer;" onclick="openPortfolioKPIDrillDown('${g}')">
                <span class="portfolio-pie-legend-dot" style="background:${gradeGroupColors[g]}"></span>
                <div class="portfolio-pie-legend-info">
                    <div class="portfolio-pie-legend-name">${gradeGroupLabels[g]}</div>
                    <div class="portfolio-pie-legend-count">${count} account${count !== 1 ? 's' : ''}</div>
                    <div class="portfolio-pie-legend-bar"><div class="portfolio-pie-legend-bar-fill" style="width:${pct}%;background:${gradeGroupColors[g]}"></div></div>
                </div>
                <span class="portfolio-pie-legend-pct">${pct}%</span>
            </div>`;
        }).join('');

        chartContainer.innerHTML = `
            <div class="portfolio-pie-chart-wrap">
                ${donutSVG}
                <div class="portfolio-pie-center-label">
                    <span class="pie-total-num">${total}</span>
                    <span class="pie-total-text">Accounts</span>
                </div>
                <div class="pie-tooltip" id="pie-tooltip"></div>
            </div>
            <div class="portfolio-pie-legend">${legendHTML}</div>
        `;

        // Wire up pie segment hover tooltips
        const pieTooltip = document.getElementById('pie-tooltip');
        const pieWrap = chartContainer.querySelector('.portfolio-pie-chart-wrap');
        if (pieTooltip && pieWrap) {
            chartContainer.querySelectorAll('.pie-segment').forEach(seg => {
                seg.addEventListener('mouseenter', function () {
                    const grade = this.getAttribute('data-grade');
                    const label = this.getAttribute('data-label');
                    const count = this.getAttribute('data-count');
                    const pct = this.getAttribute('data-pct');
                    pieTooltip.innerHTML = `
                        <div class="pie-tooltip-grade" style="color:${gradeGroupColors[grade]}">${label}</div>
                        <div class="pie-tooltip-row"><span>Accounts</span><span>${count}</span></div>
                        <div class="pie-tooltip-row"><span>Percentage</span><span>${pct}%</span></div>
                    `;
                    pieTooltip.classList.add('visible');
                });
                seg.addEventListener('mousemove', function (e) {
                    const rect = pieWrap.getBoundingClientRect();
                    let x = e.clientX - rect.left + 14;
                    let y = e.clientY - rect.top + 14;
                    // Flip if near right/bottom edges
                    if (x + 160 > rect.width) x = e.clientX - rect.left - 160;
                    if (y + 80 > rect.height) y = e.clientY - rect.top - 80;
                    pieTooltip.style.left = x + 'px';
                    pieTooltip.style.top = y + 'px';
                });
                seg.addEventListener('mouseleave', function () {
                    pieTooltip.classList.remove('visible');
                });
                seg.addEventListener('click', function () {
                    const grade = this.getAttribute('data-grade');
                    openPortfolioKPIDrillDown(grade);
                });
            });
        }
    }

    // Detail table with expandable account rows
    const branchList = branchFilter === 'all' ? branches : [branchFilter];
    const tbody = document.getElementById('portfolio-table-body');
    if (tbody) {
        tbody.innerHTML = branchList.map((branch, bIdx) => {
            const branchAccounts = accessibleARRs.filter(a => a.branch === branch);
            const bTotal = branchAccounts.length;
            const bGroupCounts = { A: 0, B: 0, C: 0 };
            branchAccounts.forEach(a => { const g = getGradeGroup(a.grade); if (bGroupCounts[g] !== undefined) bGroupCounts[g]++; });
            const grpId = 'pf-branch-' + bIdx;

            // Branch summary row (clickable to expand)
            let html = `<tr style="cursor:pointer;" onclick="togglePortfolioBranch('${grpId}','${grpId}-arrow')">
                <td style="text-align:center;"><span id="${grpId}-arrow" style="font-size:9px;color:var(--text-muted);">\u25B6</span></td>
                <td><strong>${branch}</strong></td>
                <td>${bTotal}</td>
                ${gradeGroups.map(g => {
                    const pct = bTotal ? Math.round(bGroupCounts[g] / bTotal * 100) : 0;
                    return `<td><span class="status-badge" style="cursor:pointer;background:var(--accent-${gradeGroupColorNames[g]}-bg);color:var(--accent-${gradeGroupColorNames[g]})" onclick="event.stopPropagation();openPortfolioKPIDrillDown('${g}')">${bGroupCounts[g]} (${pct}%)</span></td>`;
                }).join('')}
            </tr>`;

            // Child rows: one per account in this branch (hidden by default)
            const sorted = [...branchAccounts].sort((a, b) => a.grade.localeCompare(b.grade));
            sorted.forEach(a => {
                const gColor = getGradeColor(a.grade);
                const riskColors = { high: 'var(--accent-red)', medium: 'var(--accent-orange)', low: 'var(--accent-green)' };
                const rColor = riskColors[a.risk] || 'var(--text-muted)';
                html += `<tr data-parent="${grpId}" style="display:none;background:#f9fafb;">
                    <td></td>
                    <td style="padding-left:24px;">${myAccountLink(a.account)}</td>
                    <td style="text-align:center;"><span style="display:inline-block;background:${gColor};color:#fff;font-weight:700;font-size:11px;min-width:24px;height:24px;line-height:24px;text-align:center;border-radius:12px;padding:0 5px;">${a.grade}</span></td>
                    <td><span style="color:${rColor};font-weight:600;font-size:12px;">${a.risk.charAt(0).toUpperCase() + a.risk.slice(1)} Risk</span></td>
                    <td style="font-size:12px;color:var(--text-secondary);">${a.type}</td>
                    <td style="font-size:12px;color:var(--text-secondary);">${a.assignee}</td>
                </tr>`;
            });

            return html;
        }).join('');
    }
}

// ==================== PORTFOLIO KPI DRILL-DOWN ====================
function openPortfolioKPIDrillDown(grade) {
    const gradeGroupLabels = { A: 'A Range (A+/A/A-)', B: 'B Range (B+/B/B-)', C: 'C Range (C+/C/C-)' };
    const accessibleARRs = canSeeAllTerritories() ? sampleARRs : sampleARRs.filter(a => a.assignee === currentUser.name);
    let title = '';
    let filtered = [];

    if (grade === 'all') {
        title = 'All Accounts';
        filtered = accessibleARRs;
    } else if (grade === 'A' || grade === 'B' || grade === 'C') {
        title = gradeGroupLabels[grade] || ('Grade ' + grade);
        filtered = accessibleARRs.filter(a => getGradeGroup(a.grade) === grade);
    } else {
        title = 'Grade ' + grade;
        filtered = accessibleARRs.filter(a => a.grade === grade);
    }

    const thStyle = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';
    const statusColors = { Active: 'var(--accent-green)', 'In Review': 'var(--accent-blue)', 'Past Due': 'var(--accent-red)', Pending: 'var(--accent-orange)' };

    let rows = filtered.map(a => {
        const gColor = getGradeColor(a.grade);
        const sColor = statusColors[a.status] || 'var(--text-muted)';
        return `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${myAccountLink(a.account)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${a.branch}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;"><span style="display:inline-block;background:${gColor};color:#fff;font-weight:700;font-size:11px;min-width:24px;height:24px;line-height:24px;text-align:center;border-radius:12px;padding:0 5px;">${a.grade}</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;"><span style="color:${sColor};font-weight:600;">${a.status}</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${a.type}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${a.risk}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${a.assignee}</td>
        </tr>`;
    }).join('');

    // Summary by grade group
    const gradeGroups = ['A', 'B', 'C'];
    const summaryParts = gradeGroups.map(g => {
        const cnt = filtered.filter(a => getGradeGroup(a.grade) === g).length;
        const gColor = g === 'A' ? 'var(--accent-green)' : g === 'B' ? 'var(--accent-blue)' : 'var(--accent-orange)';
        return cnt > 0 ? `<span style="display:inline-flex;align-items:center;gap:4px;margin-right:14px;"><span style="display:inline-block;background:${gColor};color:#fff;font-weight:700;font-size:10px;min-width:20px;height:20px;line-height:20px;text-align:center;border-radius:10px;padding:0 4px;">${g}</span> ${cnt}</span>` : '';
    }).filter(Boolean).join('');

    const body = `
        <div style="margin-bottom:12px;font-size:13px;color:var(--text-secondary);">${summaryParts}</div>
        <div style="max-height:450px;overflow-y:auto;">
        <table style="width:100%;border-collapse:collapse;">
            <thead><tr>
                <th style="${thStyle}text-align:left;">Account</th>
                <th style="${thStyle}text-align:left;">Branch</th>
                <th style="${thStyle}text-align:center;">Grade</th>
                <th style="${thStyle}text-align:left;">Status</th>
                <th style="${thStyle}text-align:left;">Review Type</th>
                <th style="${thStyle}text-align:left;">Risk</th>
                <th style="${thStyle}text-align:left;">Assignee</th>
            </tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr style="background:#f8f9fa;font-weight:600;">
                <td style="padding:10px 12px;font-size:13px;" colspan="7">Total: ${filtered.length} Account${filtered.length !== 1 ? 's' : ''}</td>
            </tr></tfoot>
        </table>
    </div>`;
    const footer = '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    openModal(title + ' — Portfolio Breakdown', body, footer);
    document.getElementById('modal-container').style.maxWidth = '880px';
}

// ==================== PORTFOLIO BRANCH EXPAND/COLLAPSE ====================
function togglePortfolioBranch(groupId, arrowId) {
    const rows = document.querySelectorAll(`tr[data-parent="${groupId}"]`);
    const arrow = document.getElementById(arrowId);
    const isOpen = rows.length > 0 && rows[0].style.display !== 'none';
    rows.forEach(r => r.style.display = isOpen ? 'none' : 'table-row');
    if (arrow) arrow.textContent = isOpen ? '\u25B6' : '\u25BC';
}

// ==================== RENDER: MY ACCOUNTS ====================

let lastMyAccountsData = null;

function renderMyAccounts(data) {
    const myAccounts = data || lastMyAccountsData || sampleMyAccounts.filter(a => a.assignee === currentUser.name);
    lastMyAccountsData = myAccounts;

    const thead = document.getElementById('my-accounts-head');
    const tbody = document.getElementById('my-accounts-table-body');
    if (!tbody) return;

    // Update count
    const countEl = document.getElementById('my-accounts-count');
    if (countEl) countEl.textContent = myAccounts.length;

    const cols = [
        { key: 'name', label: 'Account Name' },
        { key: 'branch', label: 'Branch' },
        { key: 'status', label: 'Status' },
        { key: 'accountGrade', label: 'Grade' },
        { key: 'activeLOAs', label: 'Active LOAs' },
        { key: 'openBonds', label: 'Open Bond Req.' },
        { key: 'visitsYTD', label: 'Visits YTD' },
        { key: 'arrStatus', label: 'ARR Status' },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const comparators = {
        name: (a, b) => a.name.localeCompare(b.name),
        branch: (a, b) => a.branch.localeCompare(b.branch),
        status: (a, b) => a.status.localeCompare(b.status),
        accountGrade: (a, b) => a.accountGrade.localeCompare(b.accountGrade),
        activeLOAs: (a, b) => {
            const aLOAs = sampleLOAData.filter(l => l.account === a.name && getLOAStatus(l) === 'Active').length;
            const bLOAs = sampleLOAData.filter(l => l.account === b.name && getLOAStatus(l) === 'Active').length;
            return aLOAs - bLOAs;
        },
        openBonds: (a, b) => {
            const aB = sampleBondRequests.filter(br => br.account === a.name && br.status !== 'Approved' && br.status !== 'Declined').length;
            const bB = sampleBondRequests.filter(br => br.account === b.name && br.status !== 'Approved' && br.status !== 'Declined').length;
            return aB - bB;
        },
        visitsYTD: (a, b) => {
            const aV = sampleVisitations.filter(v => v.account === a.name && v.visitDate.endsWith('/2024')).length;
            const bV = sampleVisitations.filter(v => v.account === b.name && v.visitDate.endsWith('/2024')).length;
            return aV - bV;
        },
        arrStatus: (a, b) => {
            const aArr = sampleARRs.find(r => r.account === a.name);
            const bArr = sampleARRs.find(r => r.account === b.name);
            return (aArr ? aArr.status : 'N/A').localeCompare(bArr ? bArr.status : 'N/A');
        }
    };

    const st = getTableSort('myAccounts', 'name');
    const sorted = genericSort(myAccounts, st.col, st.asc, comparators);

    if (thead) thead.innerHTML = buildSortableHeader('myAccounts', cols, 'renderMyAccounts');

    tbody.innerHTML = sorted.map(acct => {
        const activeLOAs = sampleLOAData.filter(l => l.account === acct.name && getLOAStatus(l) === 'Active').length;
        const openBonds = sampleBondRequests.filter(b => b.account === acct.name && b.status !== 'Approved' && b.status !== 'Declined').length;
        const arr = sampleARRs.find(a => a.account === acct.name);
        const arrStatus = arr ? arr.status : 'N/A';
        const visitsYTD = sampleVisitations.filter(v => v.account === acct.name && v.visitDate.endsWith('/2024')).length;
        const statusCls = acct.status === 'Suspended' ? 'status-overdue' : 'status-approved';
            const gradeCls = getGradeCssClass(acct.accountGrade);

        return `<tr${acct.status === 'Suspended' ? ' style="opacity:0.75;"' : ''}>
            <td>${accountLink(acct.name)}${acct.status === 'Suspended' ? '<div style="font-size:11px; color:var(--text-muted); margin-top:2px;" title="' + (acct.suspendedReason || '') + '">Suspended</div>' : ''}</td>
            <td>${acct.branch}</td>
            <td><span class="status-badge ${statusCls}">${acct.status}</span></td>
            <td><span class="status-badge ${gradeCls}">${acct.accountGrade}</span></td>
            <td>${activeLOAs}</td>
            <td>${openBonds > 0 ? openBonds : '<span style="color:var(--text-muted);">0</span>'}</td>
            <td>${visitsYTD > 0 ? visitsYTD : '<span style="color:var(--text-muted);">0</span>'}</td>
            <td><span class="status-badge ${statusClass(arrStatus)}">${arrStatus}</span></td>
            <td><button class="btn btn-outline btn-sm" onclick="navigateTo('account-notes'); renderAccountNotesList('${acct.name.replace(/'/g, "\\'")}');">View</button></td>
        </tr>`;
    }).join('');
}

function filterMyAccounts(status, tabEl) {
    document.querySelectorAll('#my-accounts-tabs .tab').forEach(t => t.classList.remove('active'));
    if (tabEl) tabEl.classList.add('active');
    const all = sampleMyAccounts.filter(a => a.assignee === currentUser.name);
    let filtered = all;
    if (status === 'Active') filtered = all.filter(a => a.status === 'Active');
    else if (status === 'Suspended') filtered = all.filter(a => a.status === 'Suspended');
    renderMyAccounts(filtered);
}

// ==================== RENDER: ACCOUNT VISITATIONS ====================

function renderVisitations() {
    const ytdVisits = sampleVisitations.filter(v => v.visitDate.endsWith('/2024'));
    const totalYTD = ytdVisits.length;
    const inPersonYTD = ytdVisits.filter(v => v.visitType === 'In-Person').length;
    const followUpsDue = sampleVisitations.filter(v => v.followUpRequired && v.followUpDate).length;
    const uniqueAccounts = new Set(ytdVisits.map(v => v.account)).size;

    // KPI Cards
    document.querySelector('#visit-kpi-total .kpi-value').textContent = totalYTD;
    document.querySelector('#visit-kpi-inperson .kpi-value').textContent = inPersonYTD;
    document.querySelector('#visit-kpi-followups .kpi-value').textContent = followUpsDue;
    document.querySelector('#visit-kpi-accounts .kpi-value').textContent = uniqueAccounts;

    // Underwriter Summary Table
    const uwMap = {};
    sampleVisitations.forEach(v => {
        if (!uwMap[v.visitedBy]) uwMap[v.visitedBy] = { total: 0, inPerson: 0, virtual: 0, jobSite: 0, accounts: new Set(), followUps: 0 };
        const uw = uwMap[v.visitedBy];
        uw.total++;
        if (v.visitType === 'In-Person') uw.inPerson++;
        else if (v.visitType === 'Virtual') uw.virtual++;
        else if (v.visitType === 'Job Site') uw.jobSite++;
        uw.accounts.add(v.account);
        if (v.followUpRequired) uw.followUps++;
    });

    const uwBody = document.getElementById('visit-uw-summary-body');
    if (uwBody) {
        uwBody.innerHTML = Object.entries(uwMap).sort((a, b) => b[1].total - a[1].total).map(([name, d]) => `
            <tr>
                <td><strong>${name}</strong></td>
                <td>${d.total}</td>
                <td>${d.inPerson}</td>
                <td>${d.virtual}</td>
                <td>${d.jobSite}</td>
                <td>${d.accounts.size}</td>
                <td>${d.followUps > 0 ? '<span class="status-badge status-uw-review">' + d.followUps + '</span>' : '<span class="status-badge status-approved">0</span>'}</td>
            </tr>
        `).join('');
    }

    // Metrics Coverage Bars
    const allVisits = sampleVisitations;
    const totalAll = allVisits.length;
    const metricsData = [
        { label: 'Financials Discussed', count: allVisits.filter(v => v.financialsDiscussed).length },
        { label: 'Backlog Discussed', count: allVisits.filter(v => v.backlogDiscussed).length },
        { label: 'Equipment Reviewed', count: allVisits.filter(v => v.equipmentReviewed).length },
        { label: 'Safety Reviewed', count: allVisits.filter(v => v.safetyReviewed).length }
    ];

    const metricsEl = document.getElementById('visit-metrics-bars');
    if (metricsEl) {
        metricsEl.innerHTML = metricsData.map(m => {
            const pct = totalAll > 0 ? Math.round((m.count / totalAll) * 100) : 0;
            const barColor = pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444';
            return `<div style="margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:13px;font-weight:600;">${m.label}</span><span style="font-size:12px;color:var(--text-muted);">${m.count}/${totalAll} (${pct}%)</span></div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.3s;"></div></div>
            </div>`;
        }).join('');
    }

    // Purpose Breakdown Bars
    const purposeMap = {};
    allVisits.forEach(v => { purposeMap[v.purpose] = (purposeMap[v.purpose] || 0) + 1; });
    const purposeEl = document.getElementById('visit-purpose-bars');
    if (purposeEl) {
        purposeEl.innerHTML = Object.entries(purposeMap).sort((a, b) => b[1] - a[1]).map(([purpose, count]) => {
            const pct = totalAll > 0 ? Math.round((count / totalAll) * 100) : 0;
            return `<div style="margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:13px;font-weight:600;">${purpose}</span><span style="font-size:12px;color:var(--text-muted);">${count} (${pct}%)</span></div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:var(--accent-blue);border-radius:4px;transition:width 0.3s;"></div></div>
            </div>`;
        }).join('');
    }

    // Visitation Log Table (sortable)
    const logHead = document.getElementById('visit-log-head');
    const logBody = document.getElementById('visit-log-body');
    if (logBody) {
        const visitCols = [
            { key: 'visitDate', label: 'Date' },
            { key: 'account', label: 'Account' },
            { key: 'agency', label: 'Agency' },
            { key: 'visitedBy', label: 'Underwriter' },
            { key: 'visitType', label: 'Type' },
            { key: 'purpose', label: 'Purpose' },
            { key: 'overallImpression', label: 'Impression' },
            { key: 'followUp', label: 'Follow-Up' },
            { key: 'details', label: 'Details', sortable: false }
        ];

        const visitComparators = {
            visitDate: (a, b) => parseDate(a.visitDate) - parseDate(b.visitDate),
            account: (a, b) => a.account.localeCompare(b.account),
            agency: (a, b) => (a.agency || '').localeCompare(b.agency || ''),
            visitedBy: (a, b) => a.visitedBy.localeCompare(b.visitedBy),
            visitType: (a, b) => a.visitType.localeCompare(b.visitType),
            purpose: (a, b) => a.purpose.localeCompare(b.purpose),
            overallImpression: (a, b) => a.overallImpression.localeCompare(b.overallImpression),
            followUp: (a, b) => (a.followUpRequired === b.followUpRequired ? 0 : a.followUpRequired ? -1 : 1)
        };

            // Default to descending for visit date (most recent first)
            if (!tableSortState['visitLog']) { tableSortState['visitLog'] = { col: 'visitDate', asc: false }; }
            const vst = getTableSort('visitLog', 'visitDate');
        const sortedVisits = genericSort(sampleVisitations, vst.col, vst.asc, visitComparators);

        if (logHead) logHead.innerHTML = buildSortableHeader('visitLog', visitCols, 'renderVisitations');

        logBody.innerHTML = sortedVisits.map((v, si) => {
            const typeClass = v.visitType === 'In-Person' ? 'visit-type-inperson' : v.visitType === 'Virtual' ? 'visit-type-virtual' : 'visit-type-jobsite';
            const impressionClass = v.overallImpression === 'Positive' ? 'status-approved' : v.overallImpression === 'Concerns Noted' ? 'status-overdue' : 'status-uw-review';
            const followUp = v.followUpRequired ? '<span class="status-badge status-uw-review">Due ' + v.followUpDate + '</span>' : '<span style="color:var(--text-muted);font-size:12px;">None</span>';
            return `<tr>
                <td>${v.visitDate}</td>
                <td>${accountLink(v.account)}</td>
                <td>${v.agency || ''}</td>
                <td>${v.visitedBy}</td>
                <td><span class="visit-type-badge ${typeClass}">${v.visitType}</span></td>
                <td>${v.purpose}</td>
                <td><span class="status-badge ${impressionClass}">${v.overallImpression}</span></td>
                <td>${followUp}</td>
                <td><button class="btn btn-outline btn-sm" onclick="openVisitDetailModal(${sampleVisitations.indexOf(v)})">View</button></td>
            </tr>`;
        }).join('');
    }
}

function openVisitDetailModal(idx) {
    const v = sampleVisitations[idx];
    if (!v) return;
    const body = `
        <div class="form-grid" style="grid-template-columns:1fr 1fr;">
            <div class="form-group"><label class="form-label">Account</label><div class="form-static">${v.account}</div></div>
            <div class="form-group"><label class="form-label">Visit Date</label><div class="form-static">${v.visitDate}</div></div>
            <div class="form-group"><label class="form-label">Visited By</label><div class="form-static">${v.visitedBy}</div></div>
            <div class="form-group"><label class="form-label">Agency</label><div class="form-static">${v.agency || '—'}</div></div>
            <div class="form-group"><label class="form-label">Visit Type</label><div class="form-static">${v.visitType}</div></div>
            <div class="form-group"><label class="form-label">Location</label><div class="form-static">${v.location}</div></div>
            <div class="form-group"><label class="form-label">Contact(s) Met</label><div class="form-static">${v.contactMet}</div></div>
            <div class="form-group"><label class="form-label">Purpose</label><div class="form-static">${v.purpose}</div></div>
            <div class="form-group"><label class="form-label">Overall Impression</label><div class="form-static">${v.overallImpression}</div></div>
        </div>
        <div style="margin-top:16px;padding:12px;background:var(--bg-main);border-radius:var(--radius);border:1px solid var(--border-color);">
            <div style="font-weight:600;font-size:13px;margin-bottom:8px;">Metrics Covered</div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;">
                <span class="visit-metric-chip ${v.backlogDiscussed ? 'chip-yes' : 'chip-no'}">Backlog ${v.backlogDiscussed ? '\u2713' : '\u2717'}</span>
                <span class="visit-metric-chip ${v.financialsDiscussed ? 'chip-yes' : 'chip-no'}">Financials ${v.financialsDiscussed ? '\u2713' : '\u2717'}</span>
                <span class="visit-metric-chip ${v.equipmentReviewed ? 'chip-yes' : 'chip-no'}">Equipment ${v.equipmentReviewed ? '\u2713' : '\u2717'}</span>
                <span class="visit-metric-chip ${v.safetyReviewed ? 'chip-yes' : 'chip-no'}">Safety ${v.safetyReviewed ? '\u2713' : '\u2717'}</span>
            </div>
        </div>
        ${v.followUpRequired ? '<div style="margin-top:12px;padding:10px 12px;background:#fffbeb;border:1px solid #fcd34d;border-radius:var(--radius);font-size:13px;"><strong>Follow-Up Required:</strong> ' + v.followUpDate + '</div>' : ''}
        <div style="margin-top:12px;">
            <label class="form-label">Notes</label>
            <div style="padding:10px 12px;background:var(--bg-main);border:1px solid var(--border-color);border-radius:var(--radius);font-size:13px;line-height:1.5;">${v.notes}</div>
        </div>
    `;
    openModal('Visit Detail — ' + v.account, body, '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>');
}

function openLogVisitModal() {
    const accountOptions = [...new Set(sampleVisitations.map(v => v.account))].sort().map(a => `<option>${a}</option>`).join('');
    const body = `
        <div class="form-grid" style="grid-template-columns:1fr 1fr;">
            <div class="form-group"><label class="form-label">Agency <span style="color:var(--accent-red);">*</span></label><select class="form-select" id="new-visit-agency" required><option value="" disabled selected>Select Agency...</option><option>USI Insurance Services</option><option>Worldwide Surety</option><option>Marsh McLennan Agency</option><option>Aon Surety</option><option>Lockton Companies</option><option>Willis Towers Watson</option><option>Brown &amp; Brown Insurance</option><option>Hub International</option><option>Gallagher Surety</option></select></div>
            <div class="form-group"><label class="form-label">Account</label><select class="form-select" id="new-visit-account"><option value="">Select Account</option>${accountOptions}</select></div>
            <div class="form-group"><label class="form-label">Visit Date</label><input type="date" class="form-input" id="new-visit-date" value="2024-04-15"></div>
            <div class="form-group"><label class="form-label">Visit Type</label><select class="form-select" id="new-visit-type"><option>In-Person</option><option>Virtual</option><option>Job Site</option></select></div>
            <div class="form-group"><label class="form-label">Purpose</label><select class="form-select" id="new-visit-purpose"><option>Annual Visit</option><option>ARR Follow-Up</option><option>Relationship Mgmt</option><option>Job Site Inspection</option><option>New Account</option></select></div>
            <div class="form-group"><label class="form-label">Location</label><input type="text" class="form-input" id="new-visit-location" placeholder="Office / site address"></div>
            <div class="form-group"><label class="form-label">Contact(s) Met</label><input type="text" class="form-input" id="new-visit-contacts" placeholder="Name (Title), ..."></div>
        </div>
        <div style="margin-top:16px;padding:12px;background:var(--bg-main);border-radius:var(--radius);border:1px solid var(--border-color);">
            <div style="font-weight:600;font-size:13px;margin-bottom:8px;">Metrics Covered</div>
            <div id="metrics-checkboxes" style="display:flex;gap:20px;flex-wrap:wrap;">
                <label style="display:flex;align-items:center;gap:6px;font-size:13px;"><input type="checkbox" id="new-visit-backlog"> Backlog Discussed</label>
                <label style="display:flex;align-items:center;gap:6px;font-size:13px;"><input type="checkbox" id="new-visit-financials"> Financials Discussed</label>
                <label style="display:flex;align-items:center;gap:6px;font-size:13px;"><input type="checkbox" id="new-visit-equipment"> Equipment Reviewed</label>
                <label style="display:flex;align-items:center;gap:6px;font-size:13px;"><input type="checkbox" id="new-visit-safety"> Safety Reviewed</label>
            </div>
            <div id="custom-metrics-list" style="display:flex;gap:20px;flex-wrap:wrap;margin-top:8px;"></div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:10px;">
                <input type="text" class="form-input" id="custom-metric-input" placeholder="Add custom metric..." style="flex:1;max-width:260px;padding:6px 10px;font-size:12px;">
                <button type="button" class="btn btn-outline btn-sm" onclick="addCustomMetric()">+ Add</button>
            </div>
        </div>
        <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-top:16px;">
            <div class="form-group"><label class="form-label">Overall Impression</label><select class="form-select" id="new-visit-impression"><option>Positive</option><option>Neutral</option><option>Concerns Noted</option></select></div>
            <div class="form-group"><label class="form-label">Follow-Up Date (if needed)</label><input type="date" class="form-input" id="new-visit-followup"></div>
        </div>
        <div class="form-group" style="margin-top:12px;"><label class="form-label">Notes</label><textarea class="form-input" id="new-visit-notes" rows="3" placeholder="Key observations, action items..."></textarea></div>
    `;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Cancel</button><button class="btn btn-primary" onclick="closeAllModals()">Save Visit</button>`;
    openModal('Log New Agency Visit', body, footer);
}

function addCustomMetric() {
    const input = document.getElementById('custom-metric-input');
    const name = (input.value || '').trim();
    if (!name) return;
    const container = document.getElementById('custom-metrics-list');
    const id = 'custom-metric-' + Date.now();
    const item = document.createElement('label');
    item.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:13px;';
    item.innerHTML = `<input type="checkbox" id="${id}" checked> ${name} <span onclick="removeCustomMetric(this)" style="cursor:pointer;color:var(--accent-red);font-weight:700;margin-left:2px;font-size:14px;" title="Remove">&times;</span>`;
    container.appendChild(item);
    input.value = '';
    input.focus();
}

function removeCustomMetric(el) {
    const label = el.closest('label');
    if (label) label.remove();
}

// ==================== AGENCY VISITS KPI DRILL-DOWN ====================
function openVisitKPIDrillDown(type) {
    const ytdVisits = sampleVisitations.filter(v => v.visitDate.endsWith('/2024'));
    let title = '';
    let filtered = [];

    if (type === 'total') {
        title = 'Total Visits YTD';
        filtered = ytdVisits;
    } else if (type === 'inperson') {
        title = 'In-Person Visits YTD';
        filtered = ytdVisits.filter(v => v.visitType === 'In-Person');
    } else if (type === 'followups') {
        title = 'Follow-Ups Due';
        filtered = sampleVisitations.filter(v => v.followUpRequired && v.followUpDate);
    } else if (type === 'accounts') {
        title = 'Accounts Visited YTD';
        // Build unique accounts with visit count
        const acctMap = {};
        ytdVisits.forEach(v => {
            if (!acctMap[v.account]) acctMap[v.account] = { account: v.account, branch: v.branch || '', visits: 0, lastVisit: '', types: [] };
            acctMap[v.account].visits++;
            acctMap[v.account].lastVisit = v.visitDate;
            if (!acctMap[v.account].types.includes(v.visitType)) acctMap[v.account].types.push(v.visitType);
        });
        const acctRows = Object.values(acctMap).sort((a, b) => b.visits - a.visits);
        const thStyle = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';
        let rows = acctRows.map(a => `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${accountLink(a.account)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${a.branch}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;font-weight:600;">${a.visits}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${a.lastVisit}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${a.types.join(', ')}</td>
        </tr>`).join('');
        const body = `<div style="max-height:500px;overflow-y:auto;">
            <table style="width:100%;border-collapse:collapse;">
                <thead><tr>
                    <th style="${thStyle}text-align:left;">Account</th>
                    <th style="${thStyle}text-align:left;">Branch</th>
                    <th style="${thStyle}text-align:center;">Visits</th>
                    <th style="${thStyle}text-align:left;">Last Visit</th>
                    <th style="${thStyle}text-align:left;">Visit Types</th>
                </tr></thead>
                <tbody>${rows}</tbody>
                <tfoot><tr style="background:#f8f9fa;font-weight:600;">
                    <td style="padding:10px 12px;font-size:13px;" colspan="2">Total: ${acctRows.length} Accounts</td>
                    <td style="padding:10px 12px;font-size:13px;text-align:center;">${ytdVisits.length}</td>
                    <td colspan="2"></td>
                </tr></tfoot>
            </table>
        </div>`;
        const footer = '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
        openModal(title + ' \u2014 Breakdown', body, footer);
        document.getElementById('modal-container').style.maxWidth = '780px';
        return;
    }

    // Standard visit list table (for total, inperson, followups)
    const thStyle = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';
    const sorted = [...filtered].sort((a, b) => {
        const da = new Date(a.visitDate), db = new Date(b.visitDate);
        return db - da;
    });
    let rows = sorted.map(v => {
        const typeColors = { 'In-Person': 'var(--accent-green)', 'Virtual': 'var(--accent-blue)', 'Job Site': 'var(--accent-orange)' };
        const color = typeColors[v.visitType] || 'var(--text-muted)';
        const followUpBadge = v.followUpRequired ? `<span style="display:inline-block;background:#fef3c7;color:#92400e;font-size:10px;padding:2px 6px;border-radius:4px;margin-left:6px;">Follow-up: ${v.followUpDate}</span>` : '';
        return `<tr style="cursor:pointer;" onclick="openVisitDetail(sampleVisitations[${sampleVisitations.indexOf(v)}])">
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${accountLink(v.account)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${v.agency || ''}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${v.visitDate}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;"><span style="color:${color};font-weight:600;">${v.visitType}</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${v.purpose}${followUpBadge}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${v.visitedBy}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${v.overallImpression}</td>
        </tr>`;
    }).join('');
    const body = `<div style="max-height:500px;overflow-y:auto;">
        <table style="width:100%;border-collapse:collapse;">
            <thead><tr>
                <th style="${thStyle}text-align:left;">Account</th>
                <th style="${thStyle}text-align:left;">Agency</th>
                <th style="${thStyle}text-align:left;">Date</th>
                <th style="${thStyle}text-align:left;">Type</th>
                <th style="${thStyle}text-align:left;">Purpose</th>
                <th style="${thStyle}text-align:left;">Visited By</th>
                <th style="${thStyle}text-align:left;">Impression</th>
            </tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr style="background:#f8f9fa;font-weight:600;">
                <td style="padding:10px 12px;font-size:13px;" colspan="7">Total: ${sorted.length} Visit${sorted.length !== 1 ? 's' : ''}</td>
            </tr></tfoot>
        </table>
    </div>`;
    const footer = '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    openModal(title + ' \u2014 Visit Details', body, footer);
    document.getElementById('modal-container').style.maxWidth = '920px';
}

// ==================== RENDER: RED FLAG ACCOUNTS ====================

function renderRedFlags() {
    const entries = Object.entries(sampleRedFlagData);
    // Compute per-account flag counts (current period = index 0)
    const rows = entries.map(([name, data]) => {
        const currentFlags = Object.values(data.ratios).filter(arr => arr[0].flag).length;
        const totalRatios = Object.keys(data.ratios).length;
        const mostRecentFS = data.periods[0].fsType + ' ' + data.periods[0].date;
        return { name, branch: data.branch, grade: data.grade, currentFlags, totalRatios, mostRecentFS, assignee: data.assignee };
    });

    // Only show accounts that have at least one flag
    const flaggedRows = rows.filter(r => r.currentFlags > 0);
    const totalFlaggedAccounts = flaggedRows.length;
    const totalFlags = flaggedRows.reduce((s, r) => s + r.currentFlags, 0);
    const highRisk = flaggedRows.filter(r => r.currentFlags >= 4).length;
    const moderate = flaggedRows.filter(r => r.currentFlags >= 2 && r.currentFlags < 4).length;

    // KPI cards
    const rfKpiStyle = 'cursor:pointer;transition:transform 0.15s ease,box-shadow 0.15s ease;';
    const rfKpiHover = '" onmouseenter="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(0,0,0,0.1)\'" onmouseleave="this.style.transform=\'none\';this.style.boxShadow=\'none\'';
    document.getElementById('red-flag-kpi-cards').innerHTML = `
        <div class="red-flag-kpi-card" style="${rfKpiStyle}" onclick="openRedFlagKPIDrillDown('flagged')${rfKpiHover}">
            <div class="red-flag-kpi-label">Flagged Accounts</div>
            <div class="red-flag-kpi-value rf-total">${totalFlaggedAccounts}</div>
        </div>
        <div class="red-flag-kpi-card" style="${rfKpiStyle}" onclick="openRedFlagKPIDrillDown('allflags')${rfKpiHover}">
            <div class="red-flag-kpi-label">Total Active Flags</div>
            <div class="red-flag-kpi-value rf-flags">${totalFlags}</div>
        </div>
        <div class="red-flag-kpi-card" style="${rfKpiStyle}" onclick="openRedFlagKPIDrillDown('high')${rfKpiHover}">
            <div class="red-flag-kpi-label">High Risk (4+ flags)</div>
            <div class="red-flag-kpi-value rf-high">${highRisk}</div>
        </div>
        <div class="red-flag-kpi-card" style="${rfKpiStyle}" onclick="openRedFlagKPIDrillDown('moderate')${rfKpiHover}">
            <div class="red-flag-kpi-label">Moderate (2-3 flags)</div>
            <div class="red-flag-kpi-value rf-moderate">${moderate}</div>
        </div>
    `;

    // Table
    document.getElementById('red-flags-table-body').innerHTML = flaggedRows.sort((a, b) => b.currentFlags - a.currentFlags).map(r => `
        <tr>
            <td>${accountLink(r.name)}</td>
            <td>${r.branch}</td>
                <td><span class="status-badge ${getGradeCssClass(r.grade)}">${r.grade}</span></td>
            <td><span class="rf-flag-count ${r.currentFlags >= 4 ? 'rf-count-high' : r.currentFlags >= 2 ? 'rf-count-moderate' : 'rf-count-low'}">${r.currentFlags} / ${r.totalRatios}</span></td>
            <td>${r.mostRecentFS}</td>
            <td><button class="btn btn-outline btn-sm" onclick="openRedFlagDetail('${r.name.replace(/'/g, "\\'")}')">View Ratios</button></td>
        </tr>
    `).join('');
}

function openRedFlagDetail(accountName) {
    const data = sampleRedFlagData[accountName];
    if (!data) return;

    // Build period header columns
    const periodHeaders = data.periods.map(p =>
        `<th class="rf-period-col">
            <div class="rf-fs-type">${p.fsType}</div>
            <div class="rf-fs-date">${p.date}</div>
            <div class="rf-fs-audit">${p.auditStatus}</div>
        </th>`
    ).join('');

    // Build ratio rows
    const ratioRows = Object.entries(data.ratios).map(([ratioName, values]) => {
        const cells = values.map(v => {
            const displayVal = v.v < 0 ? `(${Math.abs(v.v).toFixed(2)})` : (ratioName.includes('/LOA') || ratioName.includes('/WOH') || ratioName.includes('UB/') ? v.v.toFixed(1) + '%' : v.v.toFixed(2));
            return `<td class="${v.flag ? 'rf-flagged-cell' : ''}">${displayVal}${v.flag ? ' <span class="rf-flag-icon">&#9873;</span>' : ''}</td>`;
        }).join('');
        return `<tr><td class="rf-ratio-name">${ratioName}</td>${cells}</tr>`;
    }).join('');

    const body = `
        <div class="rf-detail-info">
            <span><strong>Branch:</strong> ${data.branch}</span>
            <span><strong>Grade:</strong> ${data.grade}</span>
        </div>
        <div class="table-container">
            <table class="data-table rf-ratios-table">
                <thead>
                    <tr>
                        <th class="rf-ratio-header">Ratios</th>
                        ${periodHeaders}
                    </tr>
                </thead>
                <tbody>
                    ${ratioRows}
                </tbody>
            </table>
        </div>
    `;

    openModal(accountName + ' — Red Flag Ratios', body, '<button class="btn btn-outline" onclick="closeModal()">Close</button>');
}

// ==================== RED FLAGS KPI DRILL-DOWN ====================
function openRedFlagKPIDrillDown(type) {
    const entries = Object.entries(sampleRedFlagData);
    const allRows = entries.map(([name, data]) => {
        const currentFlags = Object.values(data.ratios).filter(arr => arr[0].flag).length;
        const totalRatios = Object.keys(data.ratios).length;
        const flaggedRatios = Object.entries(data.ratios).filter(([, arr]) => arr[0].flag).map(([ratio]) => ratio);
        const mostRecentFS = data.periods[0].fsType + ' ' + data.periods[0].date;
        return { name, branch: data.branch, grade: data.grade, currentFlags, totalRatios, mostRecentFS, assignee: data.assignee, flaggedRatios };
    }).filter(r => r.currentFlags > 0);

    let title = '';
    let filtered = [];

    if (type === 'flagged') {
        title = 'All Flagged Accounts';
        filtered = allRows;
    } else if (type === 'allflags') {
        title = 'Total Active Flags — By Account';
        filtered = allRows;
    } else if (type === 'high') {
        title = 'High Risk Accounts (4+ Flags)';
        filtered = allRows.filter(r => r.currentFlags >= 4);
    } else if (type === 'moderate') {
        title = 'Moderate Risk Accounts (2-3 Flags)';
        filtered = allRows.filter(r => r.currentFlags >= 2 && r.currentFlags < 4);
    }

    filtered.sort((a, b) => b.currentFlags - a.currentFlags);

    const thStyle = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';

    const showRatioDetail = (type === 'allflags');

    let rows = filtered.map(r => {
        const gColor = getGradeColor(r.grade);
        const riskLevel = r.currentFlags >= 4 ? 'High' : r.currentFlags >= 2 ? 'Moderate' : 'Low';
        const riskColor = r.currentFlags >= 4 ? 'var(--accent-red)' : r.currentFlags >= 2 ? 'var(--accent-orange)' : 'var(--accent-green)';
        const flagPills = showRatioDetail ? `<div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">${r.flaggedRatios.map(fr => `<span style="display:inline-block;background:#fee2e2;color:#991b1b;font-size:10px;padding:2px 6px;border-radius:4px;">${fr}</span>`).join('')}</div>` : '';
        return `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${accountLink(r.name)}${flagPills}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${r.branch}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;"><span style="display:inline-block;background:${gColor};color:#fff;font-weight:700;font-size:11px;min-width:24px;height:24px;line-height:24px;text-align:center;border-radius:12px;padding:0 5px;">${r.grade}</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;font-weight:700;">${r.currentFlags} / ${r.totalRatios}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;"><span style="color:${riskColor};font-weight:600;">${riskLevel}</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${r.mostRecentFS}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;"><button class="btn btn-outline btn-sm" onclick="openRedFlagDetail('${r.name.replace(/'/g, "\\'")}')">View Ratios</button></td>
        </tr>`;
    }).join('');

    const totalFlagsShown = filtered.reduce((s, r) => s + r.currentFlags, 0);
    const body = `<div style="max-height:480px;overflow-y:auto;">
        <table style="width:100%;border-collapse:collapse;">
            <thead><tr>
                <th style="${thStyle}text-align:left;">Account</th>
                <th style="${thStyle}text-align:left;">Branch</th>
                <th style="${thStyle}text-align:center;">Grade</th>
                <th style="${thStyle}text-align:center;">Flags</th>
                <th style="${thStyle}text-align:left;">Risk Level</th>
                <th style="${thStyle}text-align:left;">Latest FS</th>
                <th style="${thStyle}text-align:center;">Detail</th>
            </tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr style="background:#f8f9fa;font-weight:600;">
                <td style="padding:10px 12px;font-size:13px;" colspan="3">Total: ${filtered.length} Account${filtered.length !== 1 ? 's' : ''}</td>
                <td style="padding:10px 12px;font-size:13px;text-align:center;">${totalFlagsShown} flags</td>
                <td colspan="3"></td>
            </tr></tfoot>
        </table>
    </div>`;
    const footer = '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    openModal(title + ' — Red Flag Breakdown', body, footer);
    document.getElementById('modal-container').style.maxWidth = '900px';
}

// ==================== RENDER: LOA VIEW ====================

function renderLOAView(filter) {
    const activeLOAs = sampleLOAData.filter(l => getLOAStatus(l) === 'Active');
    const expiredLOAs = sampleLOAData.filter(l => getLOAStatus(l) === 'Expired');
    const totalAggregate = activeLOAs.reduce((s, l) => s + l.aggregate, 0);
    const totalUsed = activeLOAs.reduce((s, l) => s + l.used, 0);
    const expiringCount = activeLOAs.filter(l => {
        const exp = new Date(l.expDate);
        const now = new Date();
        return (exp - now) / (1000 * 60 * 60 * 24) <= 30;
    }).length;

    // KPI cards
    const kpiContainer = document.getElementById('loa-kpi-cards');
    if (kpiContainer) {
        const loaKpiStyle = 'cursor:pointer;transition:transform 0.15s ease,box-shadow 0.15s ease;';
        const loaKpiHover = '" onmouseenter="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(0,0,0,0.1)\'" onmouseleave="this.style.transform=\'none\';this.style.boxShadow=\'none\'';
        kpiContainer.innerHTML = `
            <div class="loa-kpi-card" style="${loaKpiStyle}" onclick="openLOAKPIDrillDown('active')${loaKpiHover}"><div class="loa-kpi-label">Active LOAs</div><div class="loa-kpi-value green">${activeLOAs.length}</div></div>
            <div class="loa-kpi-card" style="${loaKpiStyle}" onclick="openLOAKPIDrillDown('aggregate')${loaKpiHover}"><div class="loa-kpi-label">Total Aggregate Capacity</div><div class="loa-kpi-value blue">${fmt(totalAggregate)}</div></div>
            <div class="loa-kpi-card" style="${loaKpiStyle}" onclick="openLOAKPIDrillDown('utilization')${loaKpiHover}"><div class="loa-kpi-label">Aggregate Utilization</div><div class="loa-kpi-value ${(totalUsed / totalAggregate) > 0.7 ? 'orange' : 'green'}">${(totalUsed / totalAggregate * 100).toFixed(1)}%</div></div>
            <div class="loa-kpi-card" style="${loaKpiStyle}" onclick="openLOAKPIDrillDown('expiring')${loaKpiHover}"><div class="loa-kpi-label">Expiring in 30 Days</div><div class="loa-kpi-value ${expiringCount > 0 ? 'orange' : 'green'}">${expiringCount}</div></div>
        `;
    }

    // Table
    let data = sampleLOAData;
    if (filter === 'Active') data = activeLOAs;
    else if (filter === 'Expired') data = expiredLOAs;
    else if (filter === 'Expiring') data = activeLOAs.filter(l => {
        const exp = new Date(l.expDate);
        return (exp - new Date()) / (1000 * 60 * 60 * 24) <= 30;
    });

    const tbody = document.getElementById('loa-view-table-body');
    if (tbody) {
        tbody.innerHTML = data.map((l, i) => {
            const utilPct = (l.used / l.aggregate * 100).toFixed(1);
            const utilColor = utilPct > 80 ? 'var(--accent-red)' : utilPct > 60 ? 'var(--accent-orange)' : 'var(--accent-green)';
            const idx = sampleLOAData.indexOf(l);
            return `<tr>
                <td>${accountLink(l.account)}</td>
                <td>${l.type}</td>
                <td><span class="branch-tag-sm">${l.branch}</span></td>
                <td>${l.effDate}</td>
                <td>${l.expDate}</td>
                <td>${fmt(l.single)}</td>
                <td>${fmt(l.aggregate)}</td>
                <td>${fmt(l.used)}</td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div class="loa-utilization-bar" style="flex:1;"><div class="loa-utilization-fill" style="width:${utilPct}%; background:${utilColor};"></div></div>
                        <span style="font-size:11px; font-weight:600; color:${utilColor};">${utilPct}%</span>
                    </div>
                </td>
                <td><span class="status-badge ${statusClass(getLOAStatus(l))}">${getLOAStatus(l)}</span></td>
                <td><button class="action-btn" onclick="openLOADetail(${idx})">View</button></td>
            </tr>`;
        }).join('');
    }
}

function filterLOAView(filter, tabEl) {
    document.querySelectorAll('#loa-tabs .tab').forEach(t => t.classList.remove('active'));
    if (tabEl) tabEl.classList.add('active');
    renderLOAView(filter);
}

function openLOADetail(idx) {
    const l = sampleLOAData[idx];
    const utilPct = (l.used / l.aggregate * 100).toFixed(1);
    const utilColor = utilPct > 80 ? 'var(--accent-red)' : utilPct > 60 ? 'var(--accent-orange)' : 'var(--accent-green)';
    const remaining = l.aggregate - l.used;
    const body = `
        <div class="loa-detail-grid">
            <div class="detail-item"><div class="detail-label">Account</div><div class="detail-value">${l.account}</div></div>
            <div class="detail-item"><div class="detail-label">LOA Type</div><div class="detail-value">${l.type}</div></div>
            <div class="detail-item"><div class="detail-label">Branch</div><div class="detail-value">${l.branch}</div></div>
            <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value"><span class="status-badge ${statusClass(getLOAStatus(l))}">${getLOAStatus(l)}</span></div></div>
            <div class="detail-item"><div class="detail-label">Effective Date</div><div class="detail-value">${l.effDate}</div></div>
            <div class="detail-item"><div class="detail-label">Expiration Date</div><div class="detail-value">${l.expDate}</div></div>
            <div class="detail-item"><div class="detail-label">Single Limit</div><div class="detail-value">${fmt(l.single)}</div></div>
            <div class="detail-item"><div class="detail-label">Aggregate Limit</div><div class="detail-value">${fmt(l.aggregate)}</div></div>
            <div class="detail-item"><div class="detail-label">Amount Used</div><div class="detail-value">${fmt(l.used)}</div></div>
            <div class="detail-item"><div class="detail-label">Remaining Capacity</div><div class="detail-value">${fmt(remaining)}</div></div>
        </div>
        <div style="margin-top:16px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                <span>Aggregate Utilization</span>
                <span style="font-weight:600; color:${utilColor};">${utilPct}%</span>
            </div>
            <div class="loa-utilization-bar" style="height:12px;">
                <div class="loa-utilization-fill" style="width:${utilPct}%; background:${utilColor};"></div>
            </div>
        </div>
        <div style="margin-top:16px;">
            <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">Assigned To User: ${l.toUser}</div>
        </div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Close</button>`;
    openModal('LOA Detail — ' + l.account, body, footer);
    document.getElementById('modal-container').style.maxWidth = '700px';
}

// ==================== LOA KPI DRILL-DOWN ====================
function openLOAKPIDrillDown(type) {
    const activeLOAs = sampleLOAData.filter(l => getLOAStatus(l) === 'Active');
    let title = '';
    let filtered = [];

    if (type === 'active') {
        title = 'Active Letters of Authority';
        filtered = activeLOAs;
    } else if (type === 'aggregate') {
        title = 'Aggregate Capacity — By Account';
        filtered = activeLOAs.sort((a, b) => b.aggregate - a.aggregate);
    } else if (type === 'utilization') {
        title = 'Aggregate Utilization — By Account';
        filtered = activeLOAs.sort((a, b) => (b.used / b.aggregate) - (a.used / a.aggregate));
    } else if (type === 'expiring') {
        title = 'LOAs Expiring Within 30 Days';
        filtered = activeLOAs.filter(l => {
            const exp = new Date(l.expDate);
            return (exp - new Date()) / (1000 * 60 * 60 * 24) <= 30;
        });
    }

    const thStyle = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';

    let rows = filtered.map(l => {
        const utilPct = (l.used / l.aggregate * 100).toFixed(1);
        const utilColor = utilPct > 80 ? 'var(--accent-red)' : utilPct > 60 ? 'var(--accent-orange)' : 'var(--accent-green)';
        const barWidth = Math.min(100, parseFloat(utilPct));
        return `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${accountLink(l.account)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${l.branch}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;">$${l.single.toLocaleString()}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;">$${l.aggregate.toLocaleString()}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;">$${l.used.toLocaleString()}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;width:120px;">
                <div style="display:flex;align-items:center;gap:6px;">
                    <div style="flex:1;background:#e5e7eb;border-radius:4px;height:8px;"><div style="background:${utilColor};border-radius:4px;height:8px;width:${barWidth}%;"></div></div>
                    <span style="font-size:11px;font-weight:600;color:${utilColor};min-width:40px;text-align:right;">${utilPct}%</span>
                </div>
            </td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;">${l.expDate}</td>
        </tr>`;
    }).join('');

    const totalAgg = filtered.reduce((s, l) => s + l.aggregate, 0);
    const totalUsed = filtered.reduce((s, l) => s + l.used, 0);
    const overallUtil = totalAgg > 0 ? (totalUsed / totalAgg * 100).toFixed(1) : '0.0';

    const body = `<div style="max-height:480px;overflow-y:auto;">
        <table style="width:100%;border-collapse:collapse;">
            <thead><tr>
                <th style="${thStyle}text-align:left;">Account</th>
                <th style="${thStyle}text-align:left;">Branch</th>
                <th style="${thStyle}text-align:right;">Single Limit</th>
                <th style="${thStyle}text-align:right;">Aggregate</th>
                <th style="${thStyle}text-align:right;">Used</th>
                <th style="${thStyle}text-align:left;">Utilization</th>
                <th style="${thStyle}text-align:left;">Exp. Date</th>
            </tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr style="background:#f8f9fa;font-weight:600;">
                <td style="padding:10px 12px;font-size:13px;" colspan="2">Total: ${filtered.length} LOA${filtered.length !== 1 ? 's' : ''}</td>
                <td style="padding:10px 12px;font-size:13px;text-align:right;"></td>
                <td style="padding:10px 12px;font-size:13px;text-align:right;">$${totalAgg.toLocaleString()}</td>
                <td style="padding:10px 12px;font-size:13px;text-align:right;">$${totalUsed.toLocaleString()}</td>
                <td style="padding:10px 12px;font-size:13px;">${overallUtil}%</td>
                <td></td>
            </tr></tfoot>
        </table>
    </div>`;
    const footer = '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    openModal(title + ' — LOA Breakdown', body, footer);
    document.getElementById('modal-container').style.maxWidth = '920px';
}

// ==================== RENDER: EXPOSURE MAP ====================

function renderExposureMap() {
    // Rich region data with multiple metrics per region
    const exposureRegions = [
        { name: 'Pacific', abbr: 'PAC', value: 24.8, bonds: 347, lossRatio: 2.1, largestBond: 4200000, trend: 'up', trendPct: 8.3, type: { contract: 18.6, commercial: 6.2 } },
        { name: 'Northwest', abbr: 'NW', value: 4.2, bonds: 63, lossRatio: 1.4, largestBond: 890000, trend: 'flat', trendPct: 0.2, type: { contract: 2.8, commercial: 1.4 } },
        { name: 'Mountain', abbr: 'MTN', value: 7.6, bonds: 112, lossRatio: 1.8, largestBond: 1500000, trend: 'up', trendPct: 3.1, type: { contract: 5.1, commercial: 2.5 } },
        { name: 'Southwest', abbr: 'SW', value: 9.4, bonds: 156, lossRatio: 3.2, largestBond: 2100000, trend: 'down', trendPct: -2.4, type: { contract: 7.0, commercial: 2.4 } },
        { name: 'Plains', abbr: 'PLN', value: 5.8, bonds: 87, lossRatio: 1.2, largestBond: 750000, trend: 'up', trendPct: 1.5, type: { contract: 4.0, commercial: 1.8 } },
        { name: 'Gulf Coast', abbr: 'GC', value: 8.3, bonds: 124, lossRatio: 4.5, largestBond: 1850000, trend: 'down', trendPct: -5.2, type: { contract: 5.8, commercial: 2.5 } },
        { name: 'Great Lakes', abbr: 'GL', value: 12.1, bonds: 198, lossRatio: 2.4, largestBond: 2800000, trend: 'up', trendPct: 4.6, type: { contract: 8.5, commercial: 3.6 } },
        { name: 'Mid-Atlantic', abbr: 'MA', value: 14.7, bonds: 245, lossRatio: 2.9, largestBond: 3500000, trend: 'up', trendPct: 6.1, type: { contract: 10.2, commercial: 4.5 } },
        { name: 'Southeast', abbr: 'SE', value: 21.5, bonds: 289, lossRatio: 3.8, largestBond: 3800000, trend: 'flat', trendPct: 0.8, type: { contract: 14.5, commercial: 7.0 } },
        { name: 'Northeast', abbr: 'NE', value: 18.2, bonds: 312, lossRatio: 2.6, largestBond: 4500000, trend: 'up', trendPct: 5.7, type: { contract: 12.0, commercial: 6.2 } }
    ];

    // US State SVG paths (Albers USA projection) grouped by region
    const usStates = [
        // Pacific
        { id:'WA', region:'Pacific', d:'M102.07324,7.6117734L106.43807,9.0667177L116.1377,11.814946L124.7057,13.754871L144.7516,19.412988L167.70739,25.071104L182.93051,28.278277L169.29815,91.864088L156.85315,88.33877L141.34514,84.768091L126.11585,84.801329L125.66028,83.45663L120.06106,85.635923L115.46563,84.899179L113.31866,83.315125L112.00545,83.973101L107.26979,83.832858L105.57143,82.483225L100.30839,80.370922L99.573419,80.51784L95.184297,78.993392L93.290999,80.810771L87.025093,80.512038L81.099395,76.386336L81.878352,75.453573L81.999575,67.776121L79.717576,63.93642L75.602368,63.32938L74.924958,60.818764L72.649446,60.361832L69.094498,61.592408L66.831251,58.373161L67.154572,55.463272L69.9028,55.139951L71.519405,51.09844L68.932837,49.966816L69.094498,46.248625L73.459331,45.601984L70.711103,42.853756L69.256158,35.740695L69.9028,32.830807L69.9028,24.909444L68.124535,21.676234L70.387782,12.299927L72.489368,12.784908L74.914275,15.694797L77.662503,18.281364L80.895712,20.22129L85.422205,22.322876L88.493756,22.969518L91.403645,24.424462L94.798518,25.394425L97.061764,25.232765L97.061764,22.807857L98.355048,21.676234L100.45663,20.38295L100.77996,21.514574L101.10328,23.292839L98.840029,23.77782L98.516708,25.879406L100.29497,27.334351L101.4266,29.759258L102.07324,31.699183L103.52818,31.537523L103.68984,30.244239L102.71988,28.950955L102.2349,25.717746L103.0432,23.939481L102.39656,22.484537L102.39656,20.22129L104.17483,16.66476L103.0432,14.078192L100.61829,9.2283781L100.94162,8.4200758L102.07324,7.6117734ZM92.616548,13.590738L94.637312,13.429078L95.122294,14.803197L96.658073,13.186582L99.002155,13.186582L99.810458,14.722361L98.274678,16.419801L98.92133,17.228114L98.193853,19.248875L96.819734,19.653021C96.819734,19.653021,95.930596,19.733857,95.930596,19.410536C95.930596,19.087215,97.385551,16.823958,97.385551,16.823958L95.688111,16.258141L95.36479,17.713095L94.637312,18.359737L93.10153,16.09648L92.616548,13.590738Z' },
        { id:'OR', region:'Pacific', d:'M148.72184,175.53153L157.57154,140.73002L158.62233,136.5005L160.9767,130.87727L160.36119,129.71439L157.84633,129.66821L156.56473,127.99751L157.02197,126.53344L157.52538,123.28656L161.98353,117.79961L163.81251,116.70046L164.95562,115.55735L166.44166,111.99172L170.48872,106.32232L174.05435,102.45992L174.28297,99.008606L171.01411,96.539924L169.2307,91.897299L156.56693,88.285329L141.47784,84.741679L126.04582,84.855985L125.58858,83.484256L120.10163,85.54186L115.64349,84.970301L113.24295,83.36994L111.98553,84.055815L107.29877,83.827183L105.5841,82.455454L100.32578,80.39785L99.525598,80.512166L95.181768,79.02611L93.238477,80.855093L87.065665,80.512166L81.121482,76.396957L81.807347,75.596777L82.035968,67.823604L79.749743,63.937027L75.634535,63.365468L74.94867,60.850621L72.594738,60.384056L66.796213,62.44284L64.532966,68.909258L61.299757,78.932207L58.066547,85.398626L53.055073,99.463087L46.588654,113.04256L38.505631,125.65208L36.565705,128.56197L35.757403,137.12997L36.143498,149.2102L148.72184,175.53153Z' },
        { id:'CA', region:'Pacific', d:'M144.69443,382.19813L148.63451,381.70951L150.12055,379.69807L150.66509,376.75698L147.11357,376.16686L146.5994,375.49864L147.0769,373.46633L146.91762,372.87666L148.84019,372.25707L151.88297,369.42439L152.46453,364.42929L153.84443,361.02718L155.78772,358.86092L159.30659,357.27125L160.96098,355.66642L161.02971,353.55758L160.03638,352.97757L159.01323,351.90484L157.85801,346.05639L155.17281,341.2263L155.73862,337.7213L153.31904,336.69199L84.257718,232.51359L103.15983,164.9121L36.079967,149.21414L34.573071,153.94738L34.41141,161.38376L29.238275,173.18497L26.166727,175.77154L25.843406,176.90316L24.06514,177.71147L22.610196,181.91464L21.801894,185.14785L24.550122,189.35102L26.166727,193.55419L27.29835,197.11072L26.975029,203.57714L25.196764,206.64869L24.550122,212.46847L23.580159,216.18666L25.358424,220.06651L28.106652,224.593L30.369899,229.44282L31.663182,233.48433L31.339862,236.71754L31.016541,237.20252L31.016541,239.3041L36.674657,245.60886L36.189676,248.03377L35.543034,250.29702L34.896392,252.23694L35.058052,260.48163L37.159638,264.19982L39.099564,266.78638L41.847792,267.27137L42.817755,270.01959L41.686132,273.57612L39.584545,275.19273L38.452922,275.19273L37.64462,279.07258L38.129601,281.98247L41.362811,286.3473L42.979415,291.6821L44.434359,296.37025L45.727643,299.4418L49.122513,305.26158L50.577457,307.84814L51.062439,310.75803L52.679043,311.72799L52.679043,314.1529L51.870741,316.09283L50.092476,323.20589L49.607494,325.14581L52.032402,327.89404L56.235574,328.37902L60.762067,330.15729L64.641918,332.25887L67.551807,332.25887L70.461695,335.33042L73.048262,340.18024L74.179886,342.44348L78.059737,344.54507L82.909551,345.35337L84.364495,347.45496L85.011137,350.68817L83.556193,351.33481L83.879514,352.30477L87.112725,353.11307L89.860953,353.27474L93.020842,351.58789L96.900696,355.79106L97.708998,358.05431L100.29557,362.25748L100.61889,365.49069L100.61889,374.867L101.10387,376.64526L111.12682,378.10021L130.84939,380.84843L144.69443,382.19813ZM56.559218,338.48145L57.852506,340.01723L57.690846,341.31052L54.457625,341.22969L53.891811,340.01723L53.245167,338.56228L56.559218,338.48145ZM58.49915,338.48145L59.711608,337.83481L63.268151,339.9364L66.339711,341.14885L65.450575,341.79551L60.924066,341.55301L59.307456,339.9364L58.49915,338.48145ZM79.191764,358.28493L80.970029,360.62901L81.778342,361.59898L83.314121,362.16479L83.879928,360.70984L82.909965,358.93157L80.242562,356.91081L79.191764,357.07247L79.191764,358.28493ZM77.736809,366.93379L79.515085,370.08618L80.727543,372.02612L79.272589,372.2686L77.979305,371.05615C77.979305,371.05615,77.251828,369.6012,77.251828,369.19704C77.251828,368.7929,77.251828,367.01462,77.251828,367.01462L77.736809,366.93379Z' },
        { id:'HI', region:'Pacific', d:'M233.08751,519.30948L235.02744,515.75293L237.2907,515.42961L237.61402,516.23791L235.51242,519.30948L233.08751,519.30948ZM243.27217,515.59127L249.4153,518.17784L251.51689,517.85452L253.1335,513.97465L252.48686,510.57977L248.28366,510.09479L244.24213,511.87306L243.27217,515.59127ZM273.9878,525.61427L277.706,531.11074L280.13092,530.78742L281.26255,530.30244L282.7175,531.59573L286.43571,531.43407L287.40568,529.97912L284.49577,528.20085L282.55584,524.48263L280.45424,520.92609L274.63444,523.83599L273.9878,525.61427ZM294.19545,534.50564L295.48874,532.5657L300.17691,533.53566L300.82356,533.05068L306.96668,533.69732L306.64336,534.99062L304.05678,536.44556L299.69193,536.12224L294.19545,534.50564ZM299.53027,539.67879L301.47021,543.55866L304.54176,542.42703L304.86509,540.81041L303.24848,538.70882L299.53027,538.3855L299.53027,539.67879ZM306.4817,538.54716L308.74496,535.63726L313.43313,538.06218L317.79798,539.19381L322.16284,541.94205L322.16284,543.88198L318.6063,545.66026L313.75645,546.63022L311.33154,545.17527L306.4817,538.54716ZM323.13281,554.06663L324.74942,552.77335L328.14431,554.38997L335.74238,557.94651L339.13727,560.0481L340.75387,562.47302L342.69381,566.83787L346.73534,569.42445L346.41202,570.71775L342.53215,573.95097L338.32896,575.40592L336.87401,574.75928L333.80244,576.53754L331.37753,579.77077L329.11427,582.68067L327.33599,582.51901L323.77945,579.93243L323.45613,575.40592L324.10277,572.981L322.48616,567.32286L320.38456,565.54458L320.2229,562.958L322.48616,561.98804L324.58776,558.91648L325.07274,557.94651L323.45613,556.16823L323.13281,554.06663Z' },
        { id:'AK', region:'Pacific', d:'M158.07671,453.67502L157.75339,539.03215L159.36999,540.00211L162.44156,540.16377L163.8965,539.03215L166.48308,539.03215L166.64475,541.94205L173.59618,548.73182L174.08117,551.3184L177.47605,549.37846L178.1227,549.2168L178.44602,546.14524L179.90096,544.52863L181.0326,544.36697L182.97253,542.91201L186.04409,545.01361L186.69074,547.92352L188.63067,549.05514L189.7623,551.48006L193.64218,553.25833L197.03706,559.2398L199.78529,563.11966L202.04855,565.86791L203.50351,569.58611L208.515,571.36439L213.68817,573.46598L214.65813,577.83084L215.14311,580.9024L214.17315,584.29729L212.39487,586.56054L210.77826,585.75224L209.32331,582.68067L206.57507,581.22573L204.7968,580.09409L203.98849,580.9024L205.44344,583.65065L205.6051,587.36885L204.47347,587.85383L202.53354,585.9139L200.43195,584.62061L200.91693,586.23722L202.21021,588.0155L201.40191,588.8238C201.40191,588.8238,200.59361,588.50048,200.10863,587.85383C199.62363,587.20719,198.00703,584.45895,198.00703,584.45895L197.03706,582.19569C197.03706,582.19569,196.71374,583.48898,196.06709,583.16565C195.42044,582.84233,194.7738,581.71071,194.7738,581.71071L196.55207,579.77077L195.09712,578.31582L195.09712,573.30432L194.28882,573.30432L193.48052,576.6992L192.34888,577.1842L191.37892,573.46598L190.73227,569.74777L189.92396,569.26279L190.24729,574.92094L190.24729,576.05256L188.79233,574.75928L185.23579,568.77781L183.13419,568.29283L182.48755,564.57462L180.87094,561.66472L179.25432,560.53308L179.25432,558.26983L181.35592,556.97654L180.87094,556.65322L178.28436,557.29986L174.88947,554.87495L172.30289,551.96504L167.45306,549.37846L163.41152,546.79188L164.70482,543.55866L164.70482,541.94205L162.92654,543.55866L160.01664,544.69029L156.29843,543.55866L150.64028,541.13375L145.14381,541.13375L144.49717,541.61873L138.03072,537.73885L135.92912,537.41553L133.18088,531.59573L129.62433,531.91905L126.06778,533.374L126.55277,537.90052L127.68439,534.99062L128.65437,535.31394L127.19941,539.67879L130.43263,536.93055L131.07928,538.54716L127.19941,542.91201L125.90612,542.58869L125.42114,540.64875L124.12785,539.84045L122.83456,540.97208L120.08632,539.19381L117.01475,541.29541L115.23649,543.397L111.8416,545.4986L107.15342,545.33693L106.66844,543.23534L110.38664,542.58869L110.38664,541.29541L108.12338,540.64875L109.09336,538.22384L111.35661,534.34397L111.35661,532.5657L111.51827,531.75739L115.88313,529.49413L116.85309,530.78742L119.60134,530.78742L118.30805,528.20085L114.58983,527.87752L109.57834,530.62576L107.15342,534.02064L105.37515,536.60723L104.24352,538.87049L100.04033,540.32543L96.96876,542.91201L96.645439,544.52863L98.908696,545.4986L99.717009,547.60018L96.96876,550.83341L90.502321,555.03661L82.742574,559.2398L80.640977,560.37142L75.306159,561.50306L69.971333,563.76631L71.749608,565.0596L70.294654,566.51455L69.809672,567.64618L67.061434,566.67621L63.828214,566.83787L63.019902,569.10113L62.049939,569.10113L62.37326,566.67621L58.816709,567.96951L55.90681,568.93947L52.511924,567.64618L49.602023,569.58611L46.368799,569.58611L44.267202,570.87941L42.65059,571.68771L40.548995,571.36439L37.962415,570.23276L35.699158,570.87941L34.729191,571.84937L33.112578,570.71775L33.112578,568.77781L36.184142,567.48452L42.488929,568.13117L46.853782,566.51455L48.955378,564.41296L51.86528,563.76631L53.643553,562.958L56.391794,563.11966L58.008406,564.41296L58.978369,564.08964L61.241626,561.3414L64.313196,560.37142L67.708076,559.72478L69.00137,559.40146L69.648012,559.88644L70.456324,559.88644L71.749608,556.16823L75.791141,554.71329L77.731077,550.99508L79.994336,546.46856L81.610951,545.01361L81.934272,542.42703L80.317657,543.72032L76.922764,544.36697L76.276122,541.94205L74.982838,541.61873L74.012865,542.58869L73.851205,545.4986L72.39625,545.33693L70.941306,539.51713L69.648012,540.81041L68.516388,540.32543L68.193068,538.3855L64.151535,538.54716L62.049939,539.67879L59.463361,539.35547L60.918305,537.90052L61.403286,535.31394L60.756645,533.374L62.211599,532.40404L63.504883,532.24238L62.858241,530.4641L62.858241,526.09925L61.888278,525.12928L61.079966,526.58423L54.936843,526.58423L53.481892,525.29094L52.835247,521.41108L50.733651,517.85452L50.733651,516.88456L52.835247,516.07625L52.996908,513.97465L54.128536,512.84303L53.320231,512.35805L52.026941,512.84303L50.895313,510.09479L51.86528,505.08328L56.391794,501.85007L58.978369,500.23345L60.918305,496.51525L63.666554,495.22195L66.253132,496.35359L66.576453,498.77851L69.00137,498.45517L72.23459,496.03026L73.851205,496.67691L74.821167,497.32355L76.437782,497.32355L78.701041,496.03026L79.509354,491.6654C79.509354,491.6654,79.832675,488.75551,80.479317,488.27052C81.125959,487.78554,81.44928,487.30056,81.44928,487.30056L80.317657,485.36062L77.731077,486.16893L74.497847,486.97723L72.557911,486.49225L69.00137,484.71397L63.989875,484.55231L60.433324,480.83411L60.918305,476.95424L61.564957,474.52932L59.463361,472.75105L57.523423,469.03283L58.008406,468.22453L64.798177,467.73955L66.899773,467.73955L67.869736,468.70951L68.516388,468.70951L68.354728,467.0929L72.23459,466.44626L74.821167,466.76958L76.276122,467.90121L74.821167,470.00281L74.336186,471.45775L77.084435,473.07437L82.095932,474.85264L83.874208,473.88268L81.610951,469.51783L80.640977,466.2846L81.610951,465.47629L78.21606,463.53636L77.731077,462.40472L78.21606,460.78812L77.407756,456.90825L74.497847,452.22007L72.072929,448.01688L74.982838,446.07694L78.21606,446.07694L79.994336,446.72359L84.197528,446.56193L87.915733,443.00539L89.047366,439.93382L92.765578,437.5089L94.382182,438.47887L97.130421,437.83222L100.84863,435.73062L101.98027,435.56896L102.95023,436.37728L107.47674,436.21561L110.22498,433.14405L111.35661,433.14405L114.91316,435.56896L116.85309,437.67056L116.36811,438.80219L117.01475,439.93382L118.63137,438.31721L122.51124,438.64053L122.83456,442.35873L124.7745,443.81369L131.88759,444.46033L138.19238,448.66352L139.64732,447.69356L144.82049,450.28014L146.92208,449.6335L148.86202,448.82518L153.71185,450.76512L158.07671,453.67502ZM42.973913,482.61238L45.075509,487.9472L44.913847,488.91717L42.003945,488.59384L40.225672,484.55231L38.447399,483.09737L36.02248,483.09737L35.86082,480.51078L37.639093,478.08586L38.770722,480.51078L40.225672,481.96573L42.973913,482.61238ZM40.387333,516.07625L44.105542,516.88456L47.823749,517.85452L48.632056,518.8245L47.015444,522.5427L43.94388,522.38104L40.548995,518.8245L40.387333,516.07625ZM19.694697,502.01173L20.826327,504.5983L21.957955,506.21492L20.826327,507.02322L18.72473,503.95166L18.72473,502.01173L19.694697,502.01173ZM5.9534943,575.0826L9.3483796,572.81934L12.743265,571.84937L15.329845,572.17269L15.814828,573.7893L17.754763,574.27429L19.694697,572.33436L19.371375,570.71775L22.119616,570.0711L25.029518,572.65768L23.897889,574.43595L19.533037,575.56758L16.784795,575.0826L13.066588,573.95097L8.7017347,575.40592L7.0851227,575.72924L5.9534943,575.0826ZM54.936843,570.55609L56.553455,572.49602L58.655048,570.87941L57.2001,569.58611L54.936843,570.55609ZM57.846745,573.62764L58.978369,571.36439L61.079966,571.68771L60.271663,573.62764L57.846745,573.62764ZM81.44928,571.68771L82.904234,573.46598L83.874208,572.33436L83.065895,570.39442L81.44928,571.68771ZM90.17899,559.2398L91.310623,565.0596L94.220522,565.86791L99.232017,562.958L103.59687,560.37142L101.98027,557.94651L102.46525,555.52159L100.36365,556.81488L97.453752,556.00657L99.070357,554.87495L101.01029,555.68325L104.89016,553.90497L105.37515,552.45003L102.95023,551.64172L103.75853,549.70178L101.01029,551.64172L96.322118,555.19827L91.472284,558.10817L90.17899,559.2398ZM132.53423,539.35547L134.95915,537.90052L133.98918,536.12224L132.21091,537.09221L132.53423,539.35547Z' },
        // Northwest
        { id:'MT', region:'Northwest', d:'M369.20952,56.969133L338.5352,54.1613L309.27465,50.60477L280.01411,46.563258L247.68201,41.228463L229.25272,37.833593L196.52907,30.900857L192.05005,52.248389L195.47939,59.79293L194.10765,64.365382L195.93663,68.937833L199.13736,70.309572L203.75818,81.079025L206.45328,84.255548L206.91052,85.398666L210.33986,86.541784L210.79711,88.599377L203.70981,106.20333L203.70981,108.71818L206.22466,111.91889L207.13914,111.91889L211.94021,108.9468L212.62609,107.80368L214.22645,108.48955L213.99782,113.74787L216.7413,126.32212L219.71339,128.83696L220.62787,129.52283L222.45686,131.80905L221.99961,135.2384L222.68548,138.66773L223.8286,139.58223L226.11482,137.296L228.85829,137.296L232.05901,138.89636L234.57386,137.98187L238.68907,137.98187L242.34702,139.58223L245.0905,139.12498L245.54774,136.15288L248.51983,135.46702L249.89157,136.83876L250.34882,140.03947L251.77469,140.87411L253.66164,129.83937L360.40731,143.26829L369.20952,56.969133Z' },
        { id:'ID', region:'Northwest', d:'M148.47881,176.48395L157.24968,141.26323L158.62142,137.03371L161.13626,131.08953L159.87884,128.8033L157.36398,128.91761L156.56381,127.88881L157.02106,126.7457L157.36398,123.65929L161.82213,118.17234L163.65111,117.7151L164.79422,116.57199L165.36578,113.37127L166.28026,112.68541L170.16685,106.85553L174.05344,102.5117L174.28206,98.739432L170.85272,96.110269L169.31717,91.709286L182.94208,28.367595L196.45967,30.895706L192.05159,52.278719L195.61194,59.764071L194.03083,64.424911L196.00068,69.066144L199.1389,70.321335L202.97424,79.877923L206.48693,84.315077L206.99418,85.458195L210.33513,86.601313L210.70398,88.698388L203.73297,106.07448L203.56779,108.64041L206.19891,111.96211L207.10399,111.91321L212.01528,108.88761L212.6927,107.79264L214.25501,108.4515L213.97657,113.80522L216.71582,126.38793L220.63365,129.56584L222.31483,131.73129L221.59822,135.81515L222.66444,138.62256L223.72607,139.71384L226.20536,137.36242L229.05352,137.41131L231.97277,138.74651L234.75279,138.06458L238.54705,137.9041L242.52595,139.50446L245.26943,139.2077L245.76617,136.17039L248.69876,135.40556L249.95893,136.92147L250.39986,139.86643L251.8242,141.07964L243.4382,194.6883C243.4382,194.6883,155.47221,177.98769,148.47881,176.48395Z' },
        { id:'WY', region:'Northwest', d:'M360.37668,143.27587L253.63408,129.81881L239.5506,218.27684L352.81521,231.86233L360.37668,143.27587Z' },
        // Mountain
        { id:'NV', region:'Mountain', d:'M196.39273,185.57552L172.75382,314.39827L170.92158,314.74742L169.34882,317.1536L166.97588,317.16429L165.50393,314.42082L162.88546,314.0424L162.11454,312.93477L161.07671,312.88073L158.29834,314.52502L157.98808,321.3105L157.62599,327.08767L157.27742,335.68048L155.83032,337.76964L153.3914,336.69561L84.311514,232.49442L103.30063,164.90951L196.39273,185.57552Z' },
        { id:'UT', region:'Mountain', d:'M259.49836,310.10509L175.74933,298.23284L196.33694,185.69149L243.11725,194.43663L241.63245,205.06705L239.32083,218.23971L247.12852,219.16808L263.53504,220.97287L271.74601,221.82851L259.49836,310.10509Z' },
        { id:'CO', region:'Mountain', d:'M380.03242,320.96457L384.93566,234.63961L271.5471,221.99565L259.33328,309.93481L380.03242,320.96457Z' },
        { id:'AZ', region:'Mountain', d:'M144.9112,382.62909L142.28419,384.78742L141.96087,386.24237L142.44585,387.21233L161.36012,397.88192L173.48466,405.47996L188.19576,414.04797L205.00845,424.07092L217.29465,426.49583L242.24581,429.20074L259.50142,310.07367L175.76579,298.15642L172.6734,314.56888L171.06711,314.58419L169.35244,317.21335L166.83759,317.09903L165.58017,314.35556L162.8367,314.01263L161.9222,312.86952L161.00772,312.86952L160.09322,313.44108L158.14993,314.46988L158.03563,321.44286L157.80699,323.15753L157.23545,335.73177L155.7494,337.90368L155.17784,341.21871L157.92131,346.1341L159.17873,351.96398L159.97892,352.99278L161.00772,353.56434L160.8934,355.85056L159.29305,357.22229L155.86371,358.93696L153.92042,360.88026L152.43437,364.53821L151.86281,369.4536L149.00503,372.19707L146.94743,372.88294L147.08312,373.71282L146.62587,375.42749L147.08312,376.22767L150.74108,376.79921L150.16952,379.54269L148.68347,381.7146L144.9112,382.62909Z' },
        { id:'NM', region:'Mountain', d:'M288.15255,424.01315L287.37714,419.26505L296.02092,419.79045L326.19268,422.73635L353.46084,424.42624L355.67611,405.71877L359.53347,349.8428L361.27115,330.45357L362.84285,330.58213L363.66825,319.41874L259.6638,308.78279L242.16645,429.2176L257.62712,431.20675L258.9204,421.1838L288.15255,424.01315Z' },
        // Southwest
        { id:'TX', region:'Southwest', d:'M361.46423,330.57358L384.15502,331.65952L415.24771,332.80264L412.9131,356.25844L412.61634,374.41196L412.68448,376.49375L417.02831,380.31218L419.01496,381.75934L420.19917,381.19965L420.57254,379.38193L421.71286,381.18555L423.8245,381.22948L423.82183,379.78239L425.49177,380.74966L426.63047,381.15853L426.2712,385.12618L430.35939,385.21969L433.28471,386.41686L437.23945,386.94224L439.62083,389.02122L441.74493,386.94505L445.46987,387.55996L447.69078,390.7849L448.76574,391.10586L448.60527,393.07113L450.81888,393.86342L453.14903,391.80862L455.28205,392.42354L457.51143,392.45902L458.4445,394.89446L464.77259,397.00891L466.36564,396.24198L467.85511,392.06427L468.19583,392.06427L469.10232,392.14591L470.33137,394.21454L474.26125,394.87982L477.59825,396.0027L481.02388,397.19867L482.86446,396.22367L483.57822,393.70883L488.03144,393.75303L489.84018,394.68381L492.63943,392.5773L493.74307,392.6215L494.59411,394.22657L498.64883,394.22657L500.1677,392.19795L502.03507,392.60519L503.9811,395.00847L507.50167,397.05262L510.36043,397.86243L511.87405,398.66227L514.32075,400.65959L517.36379,399.3318L520.05488,400.47068L520.61869,406.57662L520.57893,416.27879L521.26479,425.8128L521.96697,429.41791L524.6423,433.83777L525.54048,438.7885L529.75643,444.32652L529.95245,447.47146L530.69882,448.2573L529.96875,456.63737L527.09665,461.64387L528.62962,463.79674L527.99954,466.13482L527.32997,473.53914L525.82565,476.87714L526.12053,480.37949L520.45565,481.96467L510.59436,486.49117L509.6244,488.43109L507.03783,490.37102L504.93625,491.82596L503.64296,492.63426L497.98485,497.96906L495.23662,500.07065L489.90182,503.30385L484.24371,505.72876L477.93895,509.12363L476.16069,510.57858L470.34091,514.13511L466.94604,514.78175L463.06619,520.2782L459.02468,520.60153L458.05471,522.54145L460.31796,524.48138L458.86301,529.97783L457.56973,534.50433L456.43811,538.38418L455.62981,542.91067L456.43811,545.33558L458.21637,552.28698L459.18634,558.43007L460.9646,561.1783L459.99464,562.63325L456.92309,564.57317L451.26497,560.69332L445.76852,559.5617L444.47523,560.04668L441.24202,559.40004L437.03885,556.32849L431.86572,555.19687L424.26767,551.802L422.16609,547.92214L420.8728,541.45573L417.6396,539.5158L416.99295,537.25255L417.6396,536.60591L417.96292,533.21104L416.66963,532.5644L416.02299,531.59444L417.31627,527.2296L415.69967,524.96636L412.46646,523.67307L409.07159,519.30824L405.51506,512.68016L401.31189,510.09359L401.47355,508.15367L396.13875,495.86747L395.33045,491.6643L393.55219,489.72438L393.39053,488.26943L387.40909,482.93464L384.82252,479.86309L384.82252,478.73146L382.23595,476.62988L375.44621,475.49825L368.00983,474.85161L364.93828,472.58837L360.41179,474.36663L356.85526,475.82158L354.59201,479.05478L353.62205,482.77298L349.25722,488.91607L346.83231,491.34098L344.24574,490.37102L342.46748,489.23939L340.52755,488.59275L336.6477,486.32951L336.6477,485.68286L334.86944,483.74294L329.6963,481.64135L322.25992,473.88165L319.99667,469.1935L319.99667,461.11047L316.76346,454.64405L316.27848,451.89583L314.66188,450.92586L313.53025,448.82428L308.51878,446.72269L307.2255,445.10609L300.11243,437.18472L298.81915,433.95151L294.13099,431.68826L292.67604,427.32339L290.08945,424.41352L288.14954,423.92856L287.50031,419.25092L295.50218,419.93681L324.53717,422.68026L353.57225,424.28062L355.80578,404.8188L359.69233,349.26378L361.29272,330.51646L362.66446,330.54504M461.69381,560.20778L461.128,553.0947L458.37976,545.90078L457.81394,538.86853L459.34972,530.62382L462.66378,523.75323L466.13948,518.33758L469.29188,514.78103L469.93852,515.02353L465.16952,521.65163L460.80468,528.19891L458.78391,534.827L458.46059,540.00016L459.34972,546.14328L461.9363,553.3372L462.42128,558.51034L462.58294,559.9653L461.69381,560.20778Z' },
        { id:'OK', region:'Southwest', d:'M380.34313,320.82146L363.65895,319.54815L362.77873,330.50058L383.24411,331.65746L415.29966,332.96106L412.96506,357.37971L412.50781,375.21228L412.73644,376.81264L417.08027,380.4706L419.13787,381.61371L419.82374,381.38509L420.50961,379.32748L421.88135,381.15647L423.93895,381.15647L423.93895,379.78473L426.68242,381.15647L426.22518,385.04305L430.34039,385.27167L432.85523,386.41479L436.97044,387.10066L439.48529,388.92964L441.77152,386.87204L445.20086,387.5579L447.71571,390.98724L448.63019,390.98724L448.63019,393.27347L450.91642,393.95933L453.20264,391.67311L455.03163,392.35897L457.54647,392.35897L458.46097,394.87383L464.76204,396.9528L466.13378,396.26694L467.96276,392.15173L469.10587,392.15173L470.24899,394.20933L474.3642,394.8952L478.02215,396.26694L480.99425,397.18143L482.82324,396.26694L483.5091,393.75209L487.85293,393.75209L489.91053,394.66658L492.654,392.60897L493.79712,392.60897L494.48299,394.20933L498.59819,394.20933L500.19855,392.15173L502.02754,392.60897L504.08514,395.12383L507.28585,396.9528L510.48658,397.8673L512.42766,398.98623L512.03856,361.76922L510.66681,350.79524L510.50635,341.9229L509.06646,335.38517L508.28826,328.20553L508.22012,324.38931L496.08328,324.70805L449.67324,324.25081L404.63433,322.19319L380.34313,320.82146Z' },
        // Plains
        { id:'ND', region:'Plains', d:'M475.30528,128.91846L474.69037,120.48479L473.01342,113.66887L471.12193,100.64465L470.66469,89.657624L468.92523,86.580482L467.16862,81.386086L467.19987,70.941816L467.82323,67.117729L465.98913,61.649968L437.34688,61.085941L418.75593,60.439299L392.24361,59.146015L369.29727,57.012146L362.30403,124.18898L417.23627,127.53263L475.30528,128.91846Z' },
        { id:'SD', region:'Plains', d:'M476.44687,204.02465L476.39942,203.44378L473.50371,198.59834L475.36394,193.88623L476.85667,187.99969L474.0748,185.91998L473.68964,183.17652L474.48204,180.62217L477.67055,180.63738L477.54747,175.63124L477.21417,145.45699L476.59644,141.68941L472.52412,138.35848L471.54149,136.68152L471.47899,135.0727L473.50111,133.5433L475.03333,131.87763L475.27829,129.22084L417.0212,127.62049L362.22199,124.1714L356.89672,187.86259L371.48699,188.76639L391.43684,189.972L409.17989,190.90059L432.95665,192.20417L444.93935,191.77953L446.90565,194.02471L452.10029,197.27806L452.86418,198.00081L457.40562,196.548L463.94616,195.93309L465.62146,197.26936L469.82597,198.86549L472.77103,200.50132L473.17001,201.98513L474.2095,204.22601L476.44687,204.02465Z' },
        { id:'NE', region:'Plains', d:'M486.09787,240.70058L489.32848,247.72049L489.19985,250.02301L492.65907,255.51689L495.37836,258.66923L490.32888,258.66923L446.84632,257.73055L406.05946,256.84025L383.80724,256.05638L384.88001,234.72853L352.56177,231.80828L356.9056,187.79842L372.45193,188.82723L392.57072,189.97033L410.40329,191.11345L434.18005,192.25656L444.92531,191.79932L446.98291,194.08554L451.78399,197.05764L452.9271,197.97213L457.27093,196.60039L461.15752,196.14315L463.90099,195.91452L465.72997,197.28626L469.7874,198.88662L472.75949,200.48698L473.21674,202.08734L474.13123,204.14494L475.96021,204.14494L476.75819,204.19111L477.65242,208.87293L480.57268,217.34085L481.14521,221.09756L483.6687,224.87181L484.23829,229.98595L485.84553,234.22632L486.09787,240.70058Z' },
        { id:'KS', region:'Plains', d:'M507.88059,324.38028L495.26233,324.58471L449.17324,324.12748L404.61576,322.06985L379.98602,320.81244L383.87981,256.21747L405.96327,256.89264L446.2524,257.73404L490.55364,258.72162L495.64927,258.72162L497.83367,260.88402L499.85133,260.86264L501.49163,261.87511L501.42913,264.88434L499.60015,266.60971L499.2679,268.84188L501.11098,272.24421L504.06334,275.43927L506.39069,277.05373L507.69146,288.29455L507.88059,324.38028Z' },
        { id:'MN', region:'Plains', d:'M475.23781,128.82439L474.78056,120.36535L472.95158,113.04943L471.1226,99.560705L470.66535,89.729927L468.83637,86.300584L467.23601,81.270889L467.23601,70.982869L467.92187,67.096282L466.10094,61.644615L496.23336,61.679886L496.55668,53.435202L497.20332,53.273541L499.46657,53.758523L501.40649,54.566825L502.21479,60.063281L503.66974,66.206379L505.28634,67.822984L510.13616,67.822984L510.45948,69.277928L516.76424,69.601249L516.76424,71.702835L521.61405,71.702835L521.93737,70.409551L523.06899,69.277928L525.33224,68.631286L526.62552,69.601249L529.53541,69.601249L533.41526,72.187816L538.75006,74.612723L541.17497,75.097705L541.65995,74.127742L543.11489,73.64276L543.59987,76.552649L546.18644,77.845933L546.67142,77.360951L547.96471,77.522612L547.96471,79.624198L550.55127,80.594161L553.62282,80.594161L555.23943,79.785858L558.47264,76.552649L561.0592,76.067668L561.86751,77.845933L562.35249,79.139216L563.32245,79.139216L564.29241,78.330914L573.18374,78.007593L574.962,81.079142L575.60865,81.079142L576.32226,79.994863L580.76217,79.624198L580.15007,81.903657L576.21135,83.740782L566.96557,87.80191L562.19083,89.808807L559.11928,92.395375L556.69437,95.951905L554.43113,99.831756L552.65286,100.64006L548.12637,105.65153L546.83308,105.81319L542.5053,108.57031L540.04242,111.77542L539.8138,114.96681L539.90816,123.01016L538.53212,124.69891L533.45058,128.45888L531.2205,134.44129L534.09225,136.675L534.77214,139.90198L532.9169,143.14091L533.08769,146.88893L533.45655,153.61933L536.4848,156.62132L539.8138,156.62132L541.70491,159.75392L545.08408,160.25719L548.94324,165.92866L556.03053,170.04541L558.17368,172.92053L558.84483,179.36004L477.63333,180.50483L477.29541,144.82798L476.83817,141.85589L472.72296,138.42655L471.57984,136.59757L471.57984,134.9972L473.63744,133.39685L475.00918,132.02511L475.23781,128.82439Z' },
        { id:'IA', region:'Plains', d:'M569.19154,199.5843L569.45592,202.3705L571.67964,202.94776L572.63358,204.17309L573.13359,206.02845L576.92643,209.3871L577.6123,211.7786L576.93796,215.20307L575.35565,218.43505L574.55631,221.17684L572.38356,222.77888L570.66805,223.35128L565.08903,225.21148L563.69757,229.06017L564.42621,230.43191L566.26672,232.1145L565.98379,236.15079L564.22064,237.68865L563.44923,239.33179L563.57645,242.10811L561.69014,242.56535L560.06469,243.67026L559.7859,245.02289L560.06469,247.13781L558.51367,248.25388L556.04314,245.1206L554.78057,242.67073L489.04475,245.18558L488.12672,245.35102L486.07432,240.83506L485.8457,234.20499L484.24534,230.08978L483.55948,224.83147L481.27325,221.1735L480.35877,216.37243L477.61529,208.82788L476.47218,203.45524L475.10044,201.28333L473.50008,198.53987L475.45406,193.69604L476.8258,187.98047L474.08233,185.92286L473.62508,183.17939L474.53958,180.66454L476.25425,180.66454L558.90825,179.39506L559.74251,183.57818L561.99469,185.13915L562.2514,186.56224L560.22186,189.95155L560.41227,193.15707L562.92713,196.95527L565.45392,198.24889L568.5332,198.75194L569.19154,199.5843Z' },
        { id:'MO', region:'Plains', d:'M558.44022,248.11316L555.92035,245.02591L554.77723,242.73968L490.42,245.14022L488.13374,245.25453L489.39117,247.76938L489.16255,250.0556L491.67739,253.94219L494.76379,258.0574L497.8502,260.80087L500.01143,261.02949L501.50816,261.94399L501.50816,264.91608L499.67919,266.51644L499.22193,268.80266L501.27954,272.23201L503.7944,275.2041L506.30924,277.03308L507.68097,288.69283L507.99511,324.76504L508.22373,329.45179L508.68097,334.8353L531.11396,333.96848L554.31999,333.28261L575.12465,332.4816L586.77939,332.2513L588.94879,335.6773L588.2646,338.9848L585.17735,341.38784L584.60496,343.22518L589.98345,343.68244L593.87841,342.99656L595.59559,337.50293L596.24701,331.64614L598.34504,329.09098L600.94107,327.60409L600.9925,324.55385L602.00852,322.61737L600.31429,320.0736L598.98336,321.05786L596.99074,318.83062L595.70571,314.07162L596.50672,311.55342L594.56259,308.12576L592.73195,303.54996L587.93254,302.75062L580.96374,297.15187L579.24488,293.03834L580.04423,289.83762L582.1035,283.77995L582.56242,280.91632L580.61328,279.88501L573.75794,279.08734L572.72997,277.37518L572.61817,273.14482L567.13123,269.71381L560.15572,261.94231L557.8695,254.62638L557.63921,250.40106L558.44022,248.11316Z' },
        // Gulf Coast
        { id:'LA', region:'Gulf Coast', d:'M607.96706,459.16125L604.68245,455.99511L605.69236,450.49488L605.03101,449.6018L595.76934,450.60836L570.74102,451.06728L570.05683,448.6726L570.96964,440.2169L574.28552,434.27105L579.31688,425.58003L578.74281,423.18201L579.9994,422.50116L580.45833,420.54867L578.17209,418.49274L578.0603,416.55029L576.22964,412.20478L576.08259,405.86618L520.6088,406.79015L520.63737,416.36372L521.32324,425.73725L522.00911,429.62383L524.52396,433.73904L525.43845,438.76875L529.78228,444.25568L530.0109,447.4564L530.69677,448.14227L530.0109,456.60131L527.03881,461.631L528.63917,463.68861L527.95329,466.20345L527.26743,473.51938L525.89569,476.72009L526.01815,480.33654L530.70463,478.81639L542.81798,479.0234L553.16425,482.57993L559.63067,483.71156L563.34886,482.25661L566.58207,483.38824L569.81528,484.3582L570.62358,482.25661L567.39037,481.12499L564.8038,481.60997L562.05557,479.99337C562.05557,479.99337,562.21724,478.70008,562.86388,478.53842C563.51052,478.37676,565.93543,477.56846,565.93543,477.56846L567.71369,479.0234L569.49196,478.05344L572.72517,478.70008L574.18011,481.12499L574.50343,483.38824L579.02992,483.71156L580.80819,485.48982L579.99989,487.10643L578.7066,487.91473L580.32321,489.53133L588.72955,493.08786L592.28608,491.79458L593.25605,489.36967L595.84261,488.72303L597.62088,487.26809L598.91416,488.23805L599.72246,491.14794L597.45922,491.95624L598.10586,492.60288L601.50073,491.3096L603.76398,487.91473L604.57228,487.42975L602.47069,487.10643L603.27899,485.48982L603.11733,484.03488L605.21892,483.5499L606.35054,482.25661L606.99718,483.06491C606.99718,483.06491,606.83552,486.13646,607.64383,486.13646C608.45213,486.13646,611.847,486.78311,611.847,486.78311L615.88851,488.72303L616.85847,490.17798L619.76836,490.17798L620.89999,491.14794L623.16323,488.07639L623.16323,486.62144L621.86995,486.62144L618.47508,483.87322L612.6553,483.06491L609.42209,480.80167L610.55372,478.05344L612.81696,478.37676L612.97862,477.73012L611.20036,476.76016L611.20036,476.27517L614.43357,476.27517L616.21183,473.20363L614.91855,471.2637L614.59523,468.51547L613.14028,468.67713L611.20036,470.77872L610.55372,473.36529L607.48217,472.71864L606.5122,470.94038L608.29047,469.00045L610.1938,465.55485L609.1327,463.14258L607.96706,459.16125Z' },
        { id:'MS', region:'Gulf Coast', d:'M631.55882,459.34458L631.30456,460.60073L626.13142,460.60073L624.67648,459.79243L622.57489,459.46911L615.78515,461.40903L614.00689,460.60073L611.42032,464.8039L610.31778,465.58192L609.19395,463.09394L608.05083,459.20735L604.6215,456.00664L605.7646,450.46209L605.07874,449.5476L603.24976,449.77622L595.33184,450.64959L570.78534,451.02296L570.0156,448.7976L570.88897,440.4208L574.00581,434.74799L579.23288,425.60309L578.78714,423.17049L580.024,422.51424L580.45987,420.59477L578.14239,418.51579L578.02727,416.37431L576.19155,412.25322L576.08255,406.29045L577.41008,403.80948L577.18678,400.39373L575.41729,397.31114L576.94371,395.82893L575.3731,393.32939L575.83035,391.67718L577.40775,385.15081L579.8937,383.11446L579.25203,380.74749L582.91,375.44496L585.74186,374.08854L585.52089,372.41338L585.23276,370.73228L588.10882,365.16461L590.45454,363.9331L590.60617,363.04009L627.94965,359.15892L628.13451,365.44225L628.29617,382.09331L627.48787,413.13216L627.32621,427.19665L630.07445,445.94929L631.55882,459.34458Z' },
        { id:'AL', region:'Gulf Coast', d:'M631.30647,460.41572L629.81587,446.09422L627.06763,427.34158L627.22929,413.27709L628.03759,382.23824L627.87593,365.58718L628.04102,359.16812L672.5255,355.54867L672.3777,357.73109L672.53936,359.83269L673.18601,363.22756L676.58089,371.14893L679.00579,381.01024L680.46074,387.15335L682.07734,392.00317L683.5323,398.95458L685.63388,405.25934L688.22045,408.65423L688.70543,412.04909L690.64537,412.8574L690.80703,414.95899L689.02875,419.80881L688.54377,423.04203L688.38211,424.98195L689.99873,429.3468L690.32205,434.68159L689.51373,437.10651L690.16039,437.91481L691.61533,438.72311L691.94347,441.61193L686.34581,441.25838L679.55606,441.90503L654.01366,444.81491L643.6021,446.22168L643.38072,449.09908L645.15899,450.87735L647.74556,452.81727L648.32642,460.75271L642.78436,463.32561L640.03614,463.00229L642.78436,461.06236L642.78436,460.0924L639.71282,454.11096L637.44957,453.46432L635.99462,457.82915L634.70134,460.57738L634.0547,460.41572L631.30647,460.41572Z' },
        { id:'AR', region:'Gulf Coast', d:'M593.82477,343.05296L589.84489,343.76966L584.73274,343.13563L585.15344,341.53356L588.13319,338.96687L589.07657,335.31062L587.24759,332.33852L508.83002,334.85337L510.43038,341.71206L510.43037,349.94248L511.80212,360.91647L512.03074,398.7534L514.31697,400.69669L517.28906,399.32496L520.03254,400.46807L520.71288,407.04137L576.33414,405.90077L577.47977,403.8104L577.19315,400.26089L575.36752,397.28879L576.96621,395.80358L575.36752,393.29208L576.05172,390.78225L577.42011,385.17682L579.9383,383.11419L579.25243,380.82963L582.9104,375.45784L585.65387,374.08945L585.54039,372.59587L585.19495,370.77023L588.0519,365.1715L590.45494,363.91491L590.83907,360.48728L592.60974,359.24558L589.46622,358.76131L588.12476,354.75087L590.92884,352.37416L591.4791,350.35496L592.75858,346.30835L593.82477,343.05296Z' },
        // Great Lakes
        { id:'WI', region:'Great Lakes', d:'M615.06589,197.36866L614.99915,194.21124L613.82004,189.68474L613.1734,183.54165L612.04178,181.11674L613.01174,178.04519L613.82004,175.1353L615.27499,172.54874L614.62834,169.15387L613.9817,165.59734L614.46668,163.81907L616.40661,161.39416L616.56827,158.64593L615.75997,157.35265L616.40661,154.76608L615.95409,150.59537L618.70232,144.93726L621.61221,138.14752L621.77387,135.88427L621.45055,134.91431L620.64224,135.39929L616.43907,141.70405L613.69084,145.74556L611.75092,147.52383L610.94262,149.78707L608.98767,150.59537L607.85605,152.5353L606.4011,152.21198L606.23944,150.43371L607.53273,148.00881L609.63431,143.32065L611.41258,141.70405L612.40341,139.3462L609.84296,137.44486L607.86814,127.07787L604.32067,125.73589L602.37441,123.42756L590.2447,120.70592L587.36881,119.69387L579.15569,117.52658L571.23777,116.36783L567.47261,111.23716L566.72221,111.79117L565.5243,111.62951L564.87765,110.49789L563.54364,110.79444L562.41201,110.9561L560.63375,111.92606L559.66378,111.27942L560.31043,109.33949L562.25035,106.26794L563.38197,105.13632L561.44205,103.68138L559.34046,104.48968L556.43057,106.4296L548.99419,109.66281L546.0843,110.30945L543.17442,109.82447L542.19269,108.94622L540.07599,111.7814L539.84737,114.52487L539.84737,122.9839L538.70425,124.58427L533.44593,128.47084L531.15971,134.41503L531.61695,134.64365L534.1318,136.70126L534.81766,139.90198L532.98868,143.10269L532.98868,146.98928L533.44593,153.61933L536.41802,156.59143L539.84737,156.59143L541.67635,159.79215L545.10568,160.24939L548.99227,165.96496L556.07957,170.08017L558.13717,172.82364L559.05167,180.25388L559.73753,183.5689L562.02376,185.16926L562.25238,186.541L560.19478,189.97033L560.4234,193.17106L562.93825,197.05764L565.4531,198.20075L568.42519,198.65799L569.76753,200.03811L615.06589,197.36866Z' },
        { id:'MI', region:'Great Lakes', d:'M581.61931,82.059006L583.4483,80.001402L585.62022,79.201221L590.99286,75.314624L593.27908,74.743065L593.73634,75.200319L588.59232,80.344339L585.27728,82.287628L583.21967,83.202124L581.61931,82.059006ZM667.79369,114.18719L668.44033,116.69293L671.67355,116.85459L672.96684,115.64213C672.96684,115.64213,672.88601,114.18719,672.56269,114.02552C672.23936,113.86386,670.94608,112.16642,670.94608,112.16642L668.76366,112.40891L667.14704,112.57057L666.82372,113.7022L667.79369,114.18719ZM567.49209,111.21318L568.20837,110.63278L570.9566,109.82447L574.51313,107.56123L574.51313,106.59126L575.15978,105.94462L581.14121,104.97466L583.56612,103.03473L587.93095,100.93315L588.09261,99.639864L590.03254,96.729975L591.8108,95.921673L593.10409,94.143408L595.36733,91.880161L599.73217,89.455254L604.42032,88.970273L605.55194,90.101896L605.22862,91.071859L601.51043,92.041822L600.05549,95.113371L597.79224,95.921673L597.30726,98.34658L594.88235,101.57979L594.55903,104.16636L595.36733,104.65134L596.3373,103.51972L599.89383,100.60983L601.18711,101.90311L603.45036,101.90311L606.68357,102.87307L608.13851,104.0047L609.59345,107.07625L612.34168,109.82447L616.22153,109.66281L617.67648,108.69285L619.29308,109.98613L620.90969,110.47112L622.20297,109.66281L623.33459,109.66281L624.9512,108.69285L628.99271,105.13632L632.38758,104.0047L639.01566,103.68138L643.54215,101.74145L646.12872,100.44817L647.58367,100.60983L647.58367,106.26794L648.06865,106.59126L650.97853,107.39957L652.91846,106.91458L659.06156,105.29798L660.19318,104.16636L661.64813,104.65134L661.64813,111.60274L664.88134,114.67429L666.17462,115.32093L667.4679,116.29089L666.17462,116.61421L665.36632,116.29089L661.64813,115.80591L659.54654,116.45255L657.28329,116.29089L654.05008,117.74584L652.27182,117.74584L646.45204,116.45255L641.27891,116.61421L639.33898,119.20078L632.38758,119.84742L629.96267,120.65572L628.83105,123.72727L627.53777,124.8589L627.05279,124.69724L625.59784,123.08063L621.07135,125.50554L620.42471,125.50554L619.29308,123.88893L618.48478,124.05059L616.54486,128.41543L615.57489,132.45694L612.39377,139.45774L611.21701,138.42347L609.84527,137.39215L607.90449,127.10413L604.36001,125.73408L602.30743,123.44785L590.18707,120.70437L587.3318,119.67473L579.10138,117.50199L571.21139,116.35887L567.49209,111.21318ZM697.8,177.2L694.6,168.9L692.3,159.9L689.9,156.7L687.3,154.9L685.7,156L681.8,157.8L679.9,162.8L677.1,166.5L676,167.2L674.5,166.5C674.5,166.5,671.9,165.1,672.1,164.4C672.3,163.8,672.6,159.4,672.6,159.4L676,158.1L676.8,154.7L677.4,152.1L679.9,150.5L679.5,140.5L677.9,138.2L676.6,137.4L675.8,135.3L676.6,134.5L678.2,134.8L678.4,133.2L676,131L674.7,128.4L672.1,128.4L667.6,126.9L662.1,123.5L659.3,123.5L658.7,124.2L657.7,123.7L654.6,121.4L651.7,123.2L648.8,125.5L649.2,129L650.1,129.3L652.2,129.8L652.7,130.6L650.1,131.4L647.5,131.8L646.1,133.5L645.8,135.6L646.1,137.3L646.4,142.8L642.8,144.9L642.2,144.7L642.2,140.5L643.5,138.1L644.1,135.6L643.3,134.8L641.4,135.6L640.4,139.8L637.7,141L635.9,142.9L635.7,143.9L636.4,144.7L635.7,147.3L633.5,147.8L633.5,148.9L634.3,151.3L633.1,157.5L631.5,161.5L632.2,166.2L632.7,167.3L631.9,169.8L631.5,170.6L631.2,173.3L634.8,179.3L637.7,185.8L639.1,190.6L638.3,195.3L637.3,201.3L634.9,206.4L634.6,209.2L631.3,212.3L635.8,212.1L657.2,209.9L664.4,208.9L664.5,210.5L671.4,209.3L681.7,207.8L685.5,207.4L685.7,206.8L685.8,205.3L687.9,201.6L689.9,199.9L689.7,194.8L691.3,193.2L692.4,192.9L692.6,189.3L694.2,186.3L695.2,186.9L695.4,187.5L696.2,187.7L698.1,186.7L697.8,177.2Z' },
        { id:'IL', region:'Great Lakes', d:'M619.54145,300.34244L619.5727,297.11273L620.14009,292.46677L622.47262,289.55091L624.33927,285.47515L626.57229,281.47982L626.20079,276.22742L624.19558,272.68485L624.0992,269.33817L624.79403,264.06866L623.96862,256.89029L622.90228,241.11284L621.609,226.0955L620.68672,214.4563L620.41421,213.53491L619.60591,210.94834L618.31263,207.23015L616.69602,205.45188L615.24108,202.86532L615.00751,197.37636L569.21108,199.97461L569.4397,202.34656L571.72593,203.03243L572.64041,204.17554L573.09766,206.00452L576.98424,209.43386L577.67012,211.72009L576.98424,215.14943L575.15526,218.80739L574.4694,221.32223L572.18317,223.15122L570.35419,223.83709L565.09587,225.20882L564.41,227.0378L563.72413,229.09541L564.41,230.46715L566.23898,232.06751L566.01036,236.18271L564.18137,237.78307L563.49551,239.38343L563.49551,242.1269L561.66653,242.58414L560.06617,243.72726L559.83755,245.099L560.06617,247.1566L558.3515,248.47117L557.3227,251.27181L557.77994,254.92976L560.06617,262.24569L567.3821,269.79024L572.86903,273.4482L572.64041,277.79203L573.55491,279.16377L579.95634,279.62101L582.69981,280.99275L582.01395,284.65071L579.72772,290.5949L579.04185,293.79562L581.32807,297.6822L587.72951,302.94052L592.30197,303.62639L594.35956,308.65609L596.41717,311.8568L595.50268,314.82889L597.10304,318.9441L598.93202,321.00171L600.34605,320.12102L601.25371,318.04623L603.46679,316.29903L605.59826,315.68463L608.20079,316.86443L611.82778,318.24013L613.01673,317.9419L613.2166,315.68345L611.9293,313.27166L612.23352,310.89494L614.07192,309.54749L617.09446,308.7372L618.35536,308.27868L617.74275,306.8918L616.95138,304.53743L618.38398,303.55647L619.54145,300.34244Z' },
        { id:'IN', region:'Great Lakes', d:'M619.56954,299.97132L619.63482,297.11274L620.11981,292.58623L622.38305,289.67635L624.16133,285.79648L626.74789,281.59331L626.26291,275.77352L624.48465,273.02529L624.16133,269.79208L624.96963,264.29561L624.48465,257.3442L623.19135,241.33979L621.89807,225.98203L620.9276,214.26201L623.99866,215.15152L625.45361,216.12148L626.58523,215.79816L628.68682,213.85824L631.51639,212.24125L636.60919,212.07921L658.59506,209.81595L664.17079,209.28279L665.67393,225.239L669.92528,262.08055L670.52374,267.85215L670.15224,270.1154L671.38022,271.91077L671.47661,273.28332L668.95532,274.88283L665.41589,276.43414L662.21376,276.98442L661.6153,281.85135L657.04061,285.16382L654.24419,289.17426L654.56751,291.55099L653.98617,293.08519L650.6597,293.08519L649.07417,291.46859L646.58086,292.73079L643.8979,294.23393L644.05957,297.28838L642.86578,297.54641L642.3979,296.52827L640.23102,295.02513L636.9807,296.36661L635.42939,299.37286L633.99155,298.56456L632.5366,296.96505L628.07226,297.45004L622.47943,298.42L619.56954,299.97132Z' },
        { id:'OH', region:'Great Lakes', d:'M735.32497,193.32832L729.23143,197.38167L725.35158,199.64492L721.95671,203.36311L717.9152,207.24296L714.68199,208.05126L711.7721,208.53624L706.27564,211.12281L704.17406,211.28447L700.77919,208.21292L695.60605,208.85957L693.01949,207.40462L690.63842,206.05379L685.74585,206.7572L675.56123,208.37381L664.35436,210.55854L665.64765,225.18882L667.42592,238.92999L670.01248,262.37079L670.5783,267.20196L674.70065,267.07294L677.12556,266.26463L680.48936,267.76777L682.55985,272.1326L687.69879,272.1155L689.59053,274.2342L691.3517,274.1689L693.89009,272.82744L696.39426,273.19894L701.81554,273.68162L703.54251,271.54894L705.88816,270.25566L707.95865,269.57481L708.60529,272.32305L710.38357,273.29301L713.85926,275.63708L716.04168,275.55626L717.3748,275.06378L717.55951,272.30225L719.14487,270.84729L719.24403,266.05457C719.24403,266.05457,720.26799,261.94551,720.26799,261.94551L721.56726,261.34423L722.88861,262.49197L723.42676,264.18899L725.14589,263.15157L725.58487,261.69082L724.46818,259.78776L724.53447,257.47333L725.28347,256.40102L727.43623,253.09454L728.48645,251.5512L730.58804,252.03618L732.85129,250.41957L735.92284,247.0247L738.69433,242.94597L739.01466,237.89046L739.49964,232.87897L739.32286,227.57209L738.36802,224.67731L738.71926,223.48753L740.52365,221.73742L738.23486,212.69009L735.32497,193.32832Z' },
        // Mid-Atlantic
        { id:'PA', region:'Mid-Atlantic', d:'M825.1237,224.69205L826.43212,224.42105L828.76165,223.1678L829.97353,220.68473L831.59014,218.42148L834.82335,215.34992L834.82335,214.54162L832.39844,212.92502L828.8419,210.5001L827.87194,207.91353L825.1237,207.59021L824.96204,206.45858L824.15374,203.71035L826.417,202.57873L826.57866,200.15381L825.28536,198.86052L825.44702,197.24391L827.38696,194.17236L827.38696,191.1008L830.08459,188.45492L829.16431,187.77994L826.64023,187.58703L824.34574,185.64711L822.79582,179.53105L819.29124,179.63157L816.83601,176.92824L798.74502,181.12601L755.74324,189.8557L746.85189,191.31064L746.23122,184.78925L740.86869,189.8569L739.5754,190.34188L735.37311,193.35077L738.28387,212.48822L740.76553,222.21758L744.33733,241.47907L747.60664,240.84139L759.55022,239.33892L797.47685,231.67372L812.35306,228.8504L820.65341,227.22804L820.92052,226.98951L823.02212,225.37289L825.1237,224.69205Z' },
        { id:'NJ', region:'Mid-Atlantic', d:'M829.67942,188.46016L827.35687,191.19443L827.35687,194.26599L825.41693,197.33754L825.25527,198.95416L826.54857,200.24744L826.38691,202.67236L824.12365,203.80398L824.93195,206.55221L825.09361,207.68384L827.84185,208.00716L828.81181,210.59373L832.36835,213.01865L834.79326,214.63525L834.79326,215.44356L831.81005,218.14012L830.19344,220.40336L828.73849,223.1516L826.47524,224.44488L826.01279,226.04736L825.77029,227.25982L825.16106,229.86656L826.25333,232.11075L829.48654,235.02064L834.33635,237.28389L838.37786,237.93053L838.53952,239.38547L837.73122,240.35543L838.05454,243.10366L838.86284,243.10366L840.96443,240.67876L841.77273,235.82894L844.52096,231.78743L847.59251,225.32101L848.72413,219.82456L848.07749,218.69293L847.91583,209.31662L846.29922,205.92176L845.1676,206.73006L842.41937,207.05338L841.93439,206.5684L843.06602,205.59843L845.1676,203.65851L845.23066,202.56468L844.84627,199.13084L845.41964,196.3826L845.30217,194.41359L842.49463,192.66324L837.40249,191.48748L833.26505,190.10585L829.67942,188.46016Z' },
        { id:'DE', region:'Mid-Atlantic', d:'M825.6261,228.2791L825.99441,226.13221L826.36948,224.44116L824.74648,224.83892L823.13102,225.30648L820.92476,227.07078L822.64488,232.11366L824.90814,237.77178L827.00972,247.47143L828.62634,253.77621L833.63782,253.61455L839.77994,252.43387L837.51571,245.0476L836.54574,245.53258L832.98921,243.10768L831.21095,238.41952L829.27102,234.86299L826.1239,231.99268L825.25974,229.89456L825.6261,228.2791Z' },
        { id:'MD', region:'Mid-Atlantic', d:'M839.79175,252.41476L833.7832,253.6186L828.6403,253.73606L826.79674,246.81373L824.87193,237.64441L822.29931,231.45596L821.01093,227.05763L813.50491,228.67999L798.6287,231.50331L761.17727,239.05421L762.30857,244.06587L763.27853,249.72398L763.60185,249.40066L765.70345,246.97576L767.96669,244.3581L770.3916,243.74254L771.84656,242.28759L773.62482,239.70102L774.9181,240.34767L777.82799,240.02434L780.41457,237.92276L782.42146,236.46949L784.26669,235.98451L785.91104,237.11446L788.82093,238.5694L790.76085,240.34767L791.97331,241.88345L796.09566,243.58088L796.09566,246.49077L801.59212,247.78406L802.73656,248.32604L804.14846,246.29772L807.03043,248.26788L805.75226,250.74981L804.98699,254.73547L803.20873,257.32204L803.20873,259.42363L803.85537,261.2019L808.91932,262.55759L813.23042,262.49587L816.30196,263.46584L818.40355,263.78916L819.37351,261.68757L817.91857,259.58599L817.91857,257.80772L815.49366,255.70613L813.39208,250.20968L814.68536,244.87488L814.5237,242.7733L813.23042,241.48001C813.23042,241.48001,814.68536,239.86341,814.68536,239.21677C814.68536,238.57012,815.17034,237.11518,815.17034,237.11518L817.11027,235.8219L819.05019,234.20529L819.53517,235.17526L818.08023,236.79186L816.78695,240.51005L817.11027,241.64167L818.88853,241.96499L819.37351,247.46145L817.27193,248.43141L817.59525,251.98794L818.08023,251.82628L819.21185,249.88636L820.82846,251.66462L819.21185,252.95791L818.88853,256.35278L821.4751,259.74765L825.35495,260.23263L826.97156,259.42433L830.20811,263.60726L831.56646,264.14356L838.22013,261.34661L840.22771,257.32274L839.79175,252.41476ZM823.82217,261.44348L824.95379,263.94923L825.11545,265.7275L826.24708,267.5866C826.24708,267.5866,827.13622,266.69746,827.13622,266.37414C827.13622,266.05082,826.40875,263.30258,826.40875,263.30258L825.68127,260.95849L823.82217,261.44348Z' },
        { id:'DC', region:'Mid-Atlantic', d:'M805.81945,250.84384L803.96117,249.01967L802.72854,248.33338L804.17155,246.31091L807.06064,248.25941L805.81945,250.84384Z' },
        { id:'VA', region:'Mid-Atlantic', d:'M831.63885,266.06892L831.49494,264.12189L837.94837,261.57201L837.17796,264.78985L834.25801,268.56896L833.83992,273.15478L834.30167,276.54522L832.4737,281.52338L830.30943,283.43952L828.83909,278.79871L829.28498,273.3496L830.87198,269.16653L831.63885,266.06892ZM834.97904,294.37028L776.80486,306.94571L739.37789,312.22478L732.69956,311.8496L730.11431,313.77598L722.77518,313.99667L714.39307,314.97434L703.47811,316.58896L713.94754,310.97776L713.93442,308.90283L715.45447,306.7567L726.00825,295.25527L729.95497,299.73273L733.73798,300.69671L736.28144,299.55639L738.51866,298.24523L741.05527,299.58875L744.96944,298.16099L746.84617,293.60465L749.44709,294.14467L752.30233,292.01342L754.1016,292.50702L756.92881,288.83045L757.27706,286.74734L756.3134,285.47177L757.31617,283.60514L762.59044,271.32799L763.20721,265.59291L764.4361,265.06937L766.61463,267.51224L770.55049,267.21107L772.4797,259.63744L775.27369,259.07658L776.32344,256.33551L778.90326,253.98863L781.67509,248.29344L781.76002,243.22589L791.58153,247.04871C792.26238,247.38913,792.41441,241.99956,792.41441,241.99956L796.06697,243.59789L796.1353,246.53605L801.91955,247.83554L804.0525,249.01174L805.71242,251.06743L805.05787,254.7161L803.11043,257.30708L803.22028,259.36615L803.80924,261.21906L808.78799,262.48749L813.23926,262.52737L816.30809,263.48601L818.2516,263.79531L818.96641,266.88377L822.15685,267.2863L823.02492,268.48632L822.58543,273.1764L823.96016,274.27895L823.48121,276.20934L824.71062,276.99911L824.48882,278.38371L821.79483,278.28877L821.88379,279.90429L824.16478,281.44716L824.28632,282.85906L826.05943,284.64444L826.55122,287.16857L823.99818,288.54988L825.5704,290.04418L831.37142,288.35835L834.97904,294.37028Z' },
        { id:'WV', region:'Mid-Atlantic', d:'M761.18551,238.96731L762.29752,243.91184L763.38096,249.94317L765.51125,247.36283L767.77449,244.29127L770.31287,243.67572L771.76782,242.22078L773.54609,239.63421L774.99107,240.28085L777.90096,239.95753L780.48754,237.85594L782.49443,236.40268L784.33966,235.91769L785.64358,236.93416L789.28683,238.75579L791.22676,240.53406L792.60088,241.82734L791.83916,247.38228L786.00425,244.84106L781.759,243.21904L781.65786,248.39747L778.91022,253.9342L776.38019,256.36086L775.1881,259.11025L772.54452,259.61035L771.64668,263.21223L770.60345,267.1619L766.63521,267.50264L764.31148,265.06376L763.24033,265.62317L762.60765,271.09287L761.25736,274.62737L756.29896,285.58234L757.19565,286.74304L756.98979,288.65158L754.1811,292.53605L752.3726,291.99176L749.40455,294.1515L746.86217,293.57929L744.86294,298.13486C744.86294,298.13486,741.60363,299.56508,740.94003,299.50258C740.77952,299.48746,738.47093,298.25348,738.47093,298.25348L736.13441,299.63285L733.72461,300.67725L729.97992,299.78813L728.85852,298.61985L726.6663,295.59649L723.52371,293.60837L721.81214,289.98513L717.52726,286.51694L716.88061,284.25369L714.29404,282.79874L713.48573,281.18214L713.24324,275.92816L715.42566,275.84733L717.3656,275.03903L717.52726,272.2908L719.14386,270.83585L719.30552,265.82437L720.27548,261.94451L721.56877,261.29787L722.86205,262.42949L723.34704,264.20776L725.12531,263.23779L725.61029,261.62119L724.47867,259.84292L724.47867,257.41801L725.44863,256.12472L727.71188,252.72985L729.00516,251.27491L731.10676,251.75989L733.37,250.14327L736.44155,246.7484L738.70481,242.86854L739.02813,237.21043L739.51311,232.19894L739.51311,227.51078L738.38149,224.43923L739.35145,222.98427L740.63493,221.69099L744.12618,241.51811L748.75719,240.76696L761.18551,238.96731Z' },
        // Southeast
        { id:'NC', region:'Southeast', d:'M834.98153,294.31554L837.06653,299.23289L840.62306,305.69931L843.04796,308.12422L843.6946,310.38747L841.2697,310.54913L842.078,311.19577L841.75468,315.39894L839.16811,316.69222L838.52147,318.79381L837.22819,321.7037L833.50999,323.3203L831.08509,322.99698L829.63014,322.83532L828.01354,321.54204L828.33686,322.83532L828.33686,323.80529L830.27679,323.80529L831.08509,325.09857L829.14516,331.40333L833.34833,331.40333L833.99498,333.01993L836.25822,330.75669L837.55151,330.2717L835.61158,333.82823L832.54003,338.67805L831.24675,338.67805L830.11512,338.19307L827.3669,338.83971L822.19376,341.26462L815.72734,346.59941L812.33247,351.28756L810.39255,357.75398L809.90757,360.17889L805.21941,360.66387L799.76628,362.00053L789.81987,353.798L777.21033,346.19995L774.30044,345.39164L761.69091,346.84659L757.41445,347.59674L755.79785,344.36352L752.82749,342.24682L736.3381,342.7318L729.06336,343.5401L720.01037,348.06661L713.86726,350.65317L692.68971,353.23975L693.1898,349.18542L694.96807,347.73048L697.71631,347.08383L698.36295,343.36563L702.56613,340.61741L706.44598,339.16245L710.64917,335.60592L715.014,333.50433L715.66064,330.43277L719.5405,326.55292L720.18714,326.39126C720.18714,326.39126,720.18714,327.52289,720.99545,327.52289C721.80375,327.52289,722.93538,327.84621,722.93538,327.84621L725.19863,324.28967L727.30022,323.64302L729.56346,323.96635L731.18008,320.40982L734.08997,317.82324L734.57495,315.72165L734.76245,312.07346L739.03895,312.05094L746.23754,311.19515L761.99477,308.94272L777.13081,306.85615L798.77129,302.1368L818.75461,297.87823L829.93155,295.47242L834.98153,294.31554ZM839.25199,327.52211L841.83857,325.01636L844.99095,322.42978L846.52673,321.78314L846.68839,319.76238L846.04175,313.61926L844.5868,311.27518L843.94015,309.41608L844.66763,309.17358L847.41587,314.67006L847.82002,319.11573L847.65836,322.51062L844.26348,324.04639L841.43441,326.47131L840.30279,327.68377L839.25199,327.52211Z' },
        { id:'SC', region:'Southeast', d:'M764.94328,408.16488L763.16622,409.13438L760.57965,407.84109L759.93301,405.7395L758.63973,402.18297L756.37647,400.08137L753.7899,399.43473L752.1733,394.58492L749.42506,388.60347L745.22189,386.66353L743.12029,384.72361L741.82701,382.13704L739.72542,380.1971L737.46217,378.90382L735.19892,375.99393L732.12737,373.73069L727.60086,371.95241L727.11588,370.49747L724.69098,367.58758L724.20599,366.13262L720.81111,360.95949L717.41624,361.12115L713.37472,358.69623L712.08144,357.40295L711.75812,355.62468L712.56642,353.68476L714.82967,352.71478L714.31885,350.4257L720.08695,348.08913L729.20245,343.50013L736.97718,342.69182L753.09158,342.26934L755.72983,344.14677L757.40893,347.50499L761.71128,346.89501L774.32081,345.44005L777.2307,346.24836L789.84024,353.84642L799.94832,361.9681L794.52715,367.42644L791.94058,373.56954L791.4556,379.8743L789.839,380.6826L788.70737,383.43083L786.28247,384.07747L784.18088,387.634L781.43265,390.38223L779.16941,393.7771L777.5528,394.5854L773.99627,397.98027L771.08638,398.14193L772.05635,401.37514L767.04487,406.8716L764.94328,408.16488Z' },
        { id:'GA', region:'Southeast', d:'M672.29229,355.5518L672.29229,357.73422L672.45395,359.83582L673.10059,363.23069L676.49547,371.15206L678.92038,381.01337L680.37532,387.15648L681.99193,392.00629L683.44688,398.9577L685.54847,405.26247L688.13504,408.65735L688.62002,412.05222L690.55995,412.86052L690.72161,414.96212L688.94334,419.81193L688.45836,423.04515L688.2967,424.98508L689.91331,429.34992L690.23663,434.68472L689.42832,437.10963L690.07497,437.91794L691.52992,438.72624L691.73462,441.94433L693.96763,445.29386L696.21807,447.45591L704.13945,447.61757L714.9592,446.97093L736.47159,445.67765L741.91731,445.00328L746.49456,445.03101L746.65622,447.9409L749.24279,448.7492L749.56611,444.38436L747.9495,439.85786L749.08113,438.24126L754.90091,439.04956L759.87832,439.36734L759.1029,433.06855L761.36614,423.0456L762.82109,418.84242L762.3361,416.25586L765.67051,410.01156L765.16021,408.65988L763.2468,409.36446L760.66024,408.07116L760.01359,405.96957L758.72031,402.41304L756.45705,400.31145L753.87049,399.66481L752.25388,394.81499L749.32887,388.47999L745.1257,386.54006L743.0241,384.60013L741.73081,382.01356L739.62923,380.07363L737.36598,378.78034L735.10273,375.87045L732.03118,373.60721L727.50467,371.82893L727.01969,370.37399L724.59478,367.4641L724.1098,366.00915L720.71492,361.03867L717.19505,361.13784L713.44014,358.7817L712.02186,357.48842L711.69854,355.71015L712.56934,353.77023L714.79598,352.66009L714.16204,350.56287L672.29229,355.5518Z' },
        { id:'FL', region:'Southeast', d:'M759.8167,439.1428L762.08236,446.4614L765.81206,456.20366L771.14685,465.57996L774.86504,471.88472L779.71486,477.38118L783.75637,481.09937L785.37297,484.00926L784.24135,485.30254L783.43305,486.59582L786.34293,494.03221L789.25282,496.94209L791.83939,502.27689L795.39592,508.09667L799.92241,516.34135L801.2157,523.93939L801.70068,535.90227L802.34732,537.68053L802.024,541.0754L799.59909,542.36869L799.92241,544.30861L799.27577,546.24854L799.59909,548.67344L800.08407,550.61337L797.33585,553.84658L794.2643,555.30152L790.38445,555.46318L788.9295,557.07979L786.5046,558.04975L785.21131,557.56477L784.07969,556.59481L783.75637,553.68492L782.94806,550.29005L779.55319,545.11691L775.99666,542.85367L772.11681,542.53035L771.30851,543.82363L768.23696,539.4588L767.59032,535.90227L765.00375,531.86076L763.22549,530.72913L761.60888,532.83072L759.83062,532.5074L757.72903,527.49592L754.81914,523.61607L751.90925,518.28128L749.32269,515.20973L745.76616,511.49154L747.86774,509.06663L751.10095,503.57017L750.93929,501.95357L746.4128,500.98361L744.79619,501.63025L745.11952,502.27689L747.70608,503.24685L746.25114,507.77335L745.44284,508.25833L743.66457,504.21682L742.37129,499.367L742.04797,496.61877L743.50291,491.93062L743.50291,482.39265L740.43136,478.67446L739.13808,475.60291L733.96494,474.30963L732.02502,473.66299L730.40841,471.07642L727.01354,469.45981L725.88192,466.06494L723.13369,465.09498L720.70878,461.37679L716.50561,459.92185L713.59572,458.4669L711.00916,458.4669L706.96764,459.27521L706.80598,461.21513L707.61429,462.18509L707.1293,463.31672L704.05776,463.15506L700.33957,466.71159L696.78303,468.65151L692.90318,468.65151L689.66997,469.9448L689.34665,467.19657L687.73005,465.25664L684.82016,464.12502L683.20356,462.67007L675.12053,458.79022L667.52249,457.01196L663.15766,457.6586L657.17622,458.14358L651.19478,460.24517L647.71554,460.85813L647.47762,452.80838L644.89105,450.86846L643.11278,449.09019L643.4361,446.01863L653.62072,444.72535L679.16312,441.81546L685.95287,441.16882L691.38887,441.44909L693.97544,445.32895L695.43038,446.78389L703.52854,447.29911L714.34829,446.65247L735.86068,445.35918L741.3064,444.68481L746.41398,444.88932L746.84081,447.79921L749.07381,448.60751L749.30875,443.97751L747.78053,439.80456L749.08893,438.36473L754.64356,438.81948L759.8167,439.1428ZM772.36211,571.54788L774.78703,570.90124L776.08031,570.65875L777.53527,568.31466L779.87935,566.69805L781.17264,567.18304L782.87008,567.50636L783.27423,568.55715L779.79853,569.76961L775.59533,571.22456L773.25125,572.43702L772.36211,571.54788ZM785.86081,566.53639L787.07327,567.58719L789.82151,565.4856L795.15632,561.28241L798.87452,557.40254L801.38027,550.77444L802.35024,549.077L802.5119,545.68212L801.78442,546.1671L800.81446,548.99617L799.3595,553.6035L796.12628,558.8575L791.76144,563.06068L788.36656,565.00061L785.86081,566.53639Z' },
        { id:'TN', region:'Southeast', d:'M696.67788,318.25411L644.78479,323.2656L629.02523,325.04386L624.40403,325.55657L620.53568,325.52885L620.31471,329.62968L612.12933,329.89369L605.17792,330.54033L597.08709,330.41647L595.67331,337.48933L593.97708,342.96938L590.68391,345.72022L589.33517,350.10128L589.01185,352.68785L584.97033,354.95109L586.42527,358.50763L585.45531,362.87247L584.48693,363.66212L692.64548,353.25457L693.04875,349.29963L694.85948,347.80924L697.69363,347.05979L698.36556,343.34281L702.46416,340.63785L706.51109,339.14382L710.59467,335.57349L715.03076,333.54803L715.55202,330.48068L719.61662,326.49569L720.16742,326.38152C720.16742,326.38152,720.19867,327.51314,721.00697,327.51314C721.81527,327.51314,722.9469,327.86771,722.9469,327.86771L725.21015,324.27992L727.28049,323.63328L729.5556,323.92849L731.15391,320.39563L734.10916,317.75172L734.53084,315.81261L734.8398,312.10146L732.69325,311.90169L730.09157,313.93002L723.09826,313.95909L704.73897,316.34591L696.67788,318.25411Z' },
        { id:'KY', region:'Southeast', d:'M725.9944,295.2707L723.70108,297.67238L720.12289,301.66642L715.19834,307.13109L713.98257,308.84686L713.92007,310.94844L709.54021,313.11253L703.88209,316.50741L696.65022,318.30626L644.78233,323.20512L629.02277,324.98338L624.40157,325.49609L620.53322,325.46837L620.30627,329.68865L612.12686,329.83321L605.17545,330.47985L597.18797,330.41963L598.39575,329.09955L600.89529,327.5587L601.12392,324.35797L602.03841,322.52899L600.43159,319.99009L601.23342,318.08328L603.49668,316.30502L605.59826,315.65837L608.34649,316.95166L611.90303,318.24494L613.03466,317.92162L613.19632,315.65837L611.90303,313.23346L612.22635,310.97021L614.16628,309.51527L616.75286,308.86862L618.36946,308.22198L617.56116,306.44371L616.91452,304.50378L618.42114,303.50798C618.42442,303.47086,619.6751,299.98569,619.65943,299.85017L622.71265,298.37149L628.03244,297.40153L632.52648,296.91655L633.91892,298.54398L635.44719,299.41478L637.03796,296.30657L640.22504,295.02395L642.43013,296.50798L642.84069,297.50702L644.01421,297.24301L643.85254,294.29008L646.98341,292.54089L649.1315,291.46741L650.66086,293.12822L653.97901,293.08402L654.56634,291.51277L654.19883,289.24953L656.79936,285.25103L661.57591,281.81313L662.28186,276.97727L665.20688,276.52136L668.99834,274.87568L671.44166,273.16744L671.24333,271.60251L670.10088,270.14757L670.6667,267.15266L674.85155,267.03516L677.15146,266.28936L680.49885,267.71846L682.55296,272.0833L687.68525,272.09412L689.73626,274.30231L691.35171,274.15461L693.9534,272.87644L699.19046,273.44981L701.76538,273.66732L703.45296,271.61108L706.07091,270.1852L707.95269,269.4781L708.59933,272.31473L710.64276,273.37307L713.28552,275.45556L713.40299,281.1288L714.21129,282.70121L716.80101,284.25749L717.57265,286.552L721.73254,289.98894L723.53785,293.61218L725.9944,295.2707Z' },
        // Northeast
        { id:'NY', region:'Northeast', d:'M830.37944,188.7456L829.24781,187.77564L826.66123,187.61398L824.39799,185.67406L822.76738,179.54493L819.30892,179.63547L816.86521,176.92727L797.47989,181.30921L754.47811,190.0389L746.94846,191.26689L746.2103,184.79855L747.6384,183.67317L748.93168,182.54155L749.90165,180.92494L751.67991,179.79332L753.61984,178.01505L754.10482,176.39845L756.2064,173.65022L757.33803,172.68026L757.17637,171.71029L755.88308,168.63875L754.10482,168.47709L752.16489,162.33399L755.07478,160.55572L759.43961,159.10078L763.48113,157.80749L766.71434,157.32251L773.01909,157.16085L774.95902,158.45414L776.57562,158.6158L778.67721,157.32251L781.26378,156.19089L786.43691,155.70591L788.5385,153.92764L790.31676,150.69443L791.93337,148.75451L794.03495,148.75451L795.97488,147.62288L796.13654,145.35964L794.6816,143.25805L794.35828,141.80311L795.4899,139.70152L795.4899,138.24658L793.71163,138.24658L791.93337,137.43828L791.12507,136.30665L790.96341,133.72008L796.78318,128.22363L797.42982,127.41533L798.88477,124.50544L801.79466,119.97894L804.54289,116.26075L806.64447,113.83585L809.05957,112.01024L812.14093,110.7643L817.63738,109.47101L820.87059,109.63267L825.39709,108.17773L832.96228,106.10656L833.48207,111.08623L835.90699,117.55267L836.71529,122.72582L835.74533,126.60568L838.3319,131.13218L839.1402,133.23377L838.3319,136.14367L841.2418,137.43695L841.88844,137.76027L844.96,148.75321L844.42371,153.81288L843.93873,164.64415L844.74703,170.14062L845.55533,173.69716L847.01028,180.9719L847.01028,189.05494L845.87865,191.31819L847.71798,193.31098L848.51453,194.9894L846.57461,196.76767L846.89793,198.06095L848.19121,197.73763L849.64616,196.44435L851.9094,193.85778L853.04103,193.21114L854.65763,193.85778L856.92088,194.01944L864.84224,190.13959L867.75213,187.39136L869.04541,185.93642L873.24858,187.55302L869.85371,191.10955L865.97386,194.01944L858.8608,199.35423L856.27424,200.3242L850.45446,202.26412L846.41295,203.39575L845.23821,202.86282L844.99419,199.17429L845.47917,196.42605L845.31751,194.32447L842.504,192.62547L837.9775,191.6555L834.09764,190.52388L830.37944,188.7456Z' },
        { id:'CT', region:'Northeast', d:'M874.06831,178.86288L870.39088,163.98407L865.67206,164.90438L844.44328,169.64747L845.44347,172.87314L846.89842,180.14788L847.0752,189.1148L845.85518,191.28967L847.77597,193.22201L852.0475,189.31637L855.60403,186.08316L857.54395,183.98157L858.35226,184.62821L861.10048,183.17327L866.27362,182.04165L874.06831,178.86288Z' },
        { id:'RI', region:'Northeast', d:'M874.07001,178.89536L870.37422,163.93937L876.6435,162.09423L878.83463,164.02135L882.14112,168.342L884.82902,172.74409L881.82968,174.36888L880.5364,174.20722L879.40478,175.98549L876.97987,177.92541L874.07001,178.89536Z' },
        { id:'MA', region:'Northeast', d:'M899.62349,173.25394L901.79541,172.56806L902.25267,170.85339L903.28147,170.9677L904.31027,173.25394L903.05285,173.71118L899.16625,173.8255L899.62349,173.25394ZM890.24995,174.05412L892.53617,171.42495L894.13654,171.42495L895.96553,172.911L893.56499,173.9398L891.39307,174.9686L890.24995,174.05412ZM855.45082,152.06593L873.09769,147.42525L875.36095,146.77861L877.27503,143.9829L881.0118,142.31959L883.90104,146.73243L881.47613,151.90557L881.15281,153.36051L883.09274,155.94708L884.22436,155.13878L886.00263,155.13878L888.26587,157.72534L892.14573,163.70678L895.70226,164.19176L897.9655,163.2218L899.74377,161.44353L898.93546,158.69531L896.83388,157.0787L895.37893,157.887L894.40897,156.59372L894.89395,156.10874L896.99554,155.94708L898.7738,156.75538L900.71373,159.18029L901.68369,162.09018L902.00701,164.51508L897.80384,165.97003L893.92399,167.90995L890.04414,172.43645L888.10421,173.89139L888.10421,172.92143L890.52912,171.46648L891.0141,169.68822L890.2058,166.61667L887.29591,168.07161L886.48761,169.52656L886.97259,171.7898L884.90626,172.79023L882.15906,168.2631L878.76418,163.89826L876.69368,162.08579L870.16041,163.96199L865.06808,165.01278L844.39292,169.60499L843.72516,164.83714L844.3718,154.24837L848.66107,153.35923L855.45082,152.06593Z' },
        { id:'VT', region:'Northeast', d:'M844.48416,154.05791L844.80086,148.71228L841.91015,137.92811L841.26351,137.60479L838.35361,136.3115L839.16191,133.40161L838.35361,131.30002L835.65356,126.66004L836.62353,122.78018L835.81522,117.60703L833.39031,111.14059L832.58474,106.21808L859.0041,99.48626L859.3128,105.00847L861.22906,107.7507L861.22906,111.79222L857.52191,116.85021L854.93534,117.99288L854.92429,119.11345L856.23426,120.63257L855.92333,128.73054L855.3139,137.9894L855.08595,143.54634L856.05591,144.83963L855.89425,149.41032L855.40927,151.10021L856.42345,151.82737L848.9859,153.33408L844.48416,154.05791Z' },
        { id:'NH', region:'Northeast', d:'M880.79902,142.42476L881.66802,141.34826L882.75824,138.05724L880.21516,137.14377L879.73017,134.07221L875.85032,132.94059L875.527,130.19235L868.25225,106.75153L863.65083,92.208542L862.75375,92.203482L862.10711,93.820087L861.46047,93.335106L860.4905,92.365143L859.03556,94.305068L858.98709,99.337122L859.29874,105.00434L861.23866,107.75258L861.23866,111.7941L857.52046,116.85688L854.93389,117.98852L854.93389,119.12014L856.06552,120.89841L856.06552,129.46643L855.25721,138.6811L855.09555,143.53092L856.06552,144.82422L855.90386,149.35071L855.41887,151.12899L856.38768,151.83821L873.17535,147.41366L875.35022,146.81121L877.19379,144.03788L880.79902,142.42476Z' },
        { id:'ME', region:'Northeast', d:'M922.83976,78.830719L924.77969,80.932305L927.04294,84.650496L927.04294,86.590422L924.94135,91.278575L923.00142,91.925217L919.60655,94.996766L914.75674,100.49322C914.75674,100.49322,914.1101,100.49322,913.46346,100.49322C912.81682,100.49322,912.49349,98.391636,912.49349,98.391636L910.71523,98.553296L909.74527,100.00824L907.32036,101.46319L906.3504,102.91813L907.967,104.37307L907.48202,105.01972L906.99704,107.76794L905.05711,107.60628L905.05711,105.98968L904.73379,104.69639L903.27885,105.01972L901.50058,101.78651L899.399,103.07979L900.69228,104.53473L901.0156,105.66636L900.2073,106.95964L900.53062,110.03119L900.69228,111.64779L899.07568,114.23436L896.16579,114.71934L895.84247,117.62923L890.50767,120.70078L889.21439,121.18576L887.59778,119.73082L884.52623,123.28735L885.4962,126.52056L884.04125,127.81384L883.87959,132.17867L882.75631,138.43803L880.29406,137.28208L879.80907,134.21052L875.92922,133.07889L875.6059,130.33065L868.33115,106.88983L863.63257,92.250088L865.05311,92.131923L866.5669,92.541822L866.5669,89.955254L867.8752,85.458798L870.46177,80.770645L871.91672,76.729133L869.97679,74.304226L869.97679,68.322789L870.78509,67.352826L871.5934,64.604598L871.43174,63.149654L871.27007,58.29984L873.04834,53.450026L875.95823,44.5587L878.05981,40.355528L879.3531,40.355528L880.64638,40.517188L880.64638,41.648811L881.93967,43.912058L884.68789,44.5587L885.4962,43.750397L885.4962,42.780435L889.53771,39.870546L891.31597,38.092281L892.77092,38.253942L898.75235,40.678849L900.69228,41.648811L909.74527,71.555998L915.7267,71.555998L916.53501,73.495924L916.69667,78.345738L919.60655,80.608984L920.41486,80.608984L920.57652,80.124003L920.09154,78.99238L922.83976,78.830719ZM901.90801,108.97825L903.44379,107.44247L904.81791,108.49327L905.38372,110.91819L903.68628,111.80732L901.90801,108.97825ZM908.61694,103.07763L910.39521,104.93673C910.39521,104.93673,911.6885,105.01755,911.6885,104.69423C911.6885,104.37091,911.93099,102.67347,911.93099,102.67347L912.82013,101.86517L912.01182,100.08689L909.99106,100.81437L908.61694,103.07763Z' },
    ];

    // Map state ID -> region name for lookups
    const stateToRegion = {};
    usStates.forEach(s => { stateToRegion[s.id] = s.region; });

    // Territory color palette — one distinct color per territory
    const territoryColors = {
        'Cincinnati': '#1a3a5c',
        'Great Lakes': '#2e7d32',
        'Plains': '#6d4c41',
        'Southeast': '#c0392b',
        'Gulf Coast': '#d97706',
        'Mountain': '#7b1fa2',
        'Northwest': '#00838f',
        'Pacific': '#1565c0',
        'Mid-Atlantic': '#ad1457',
        'Northeast': '#e65100'
    };

    // Map state ID to territory name for uniform coloring
    const stateToTerritoryMap = {};
    sampleTerritories.forEach(t => { t.states.forEach(sid => { stateToTerritoryMap[sid] = t.name; }); });

    function getTerritoryColor(stateId) {
        const tName = stateToTerritoryMap[stateId];
        return tName ? (territoryColors[tName] || '#6b9dc2') : '#6b9dc2';
    }

    // Color scale based on exposure value
    const maxExposure = Math.max(...exposureRegions.map(r => r.value));
    function getHeatColor(val) {
        const ratio = val / maxExposure;
        if (ratio > 0.75) return '#8B1A1A';        // brand dark red
        if (ratio > 0.55) return '#c0392b';         // red
        if (ratio > 0.35) return '#d97706';         // orange
        if (ratio > 0.15) return '#1a3a5c';         // blue
        return '#6b9dc2';                            // light blue
    }
    function getHeatLabel(val) {
        const ratio = val / maxExposure;
        if (ratio > 0.75) return 'Critical';
        if (ratio > 0.55) return 'High';
        if (ratio > 0.35) return 'Moderate';
        if (ratio > 0.15) return 'Low';
        return 'Minimal';
    }

    // Totals
    const territoryStates = getUserTerritoryStates(); // null = all, array = filtered
    const territoryRegionNames = territoryStates ? [...new Set(territoryStates.map(sid => stateToRegion[sid]).filter(Boolean))] : null;
    const territoryRegions = territoryRegionNames ? exposureRegions.filter(r => territoryRegionNames.includes(r.name)) : exposureRegions;
    const totalExposure = territoryRegions.reduce((s, r) => s + r.value, 0);
    const totalBonds = territoryRegions.reduce((s, r) => s + r.bonds, 0);
    const avgBondSize = totalBonds ? Math.round((totalExposure * 1000000) / totalBonds) : 0;
    const avgLossRatio = territoryRegions.length ? (territoryRegions.reduce((s, r) => s + r.lossRatio, 0) / territoryRegions.length).toFixed(1) : '0.0';
    const highestRegion = territoryRegions.length ? territoryRegions.reduce((a, b) => a.value > b.value ? a : b) : { abbr: 'N/A', value: 0 };

    // Territory badge
    const territoryBadge = document.getElementById('territory-badge');
    if (territoryBadge) {
        const territory = getUserTerritory();
        if (canSeeAllTerritories()) {
            territoryBadge.textContent = 'All Territories';
            territoryBadge.style.background = 'var(--accent-blue)';
            territoryBadge.style.color = '#fff';
        } else if (territory) {
            territoryBadge.textContent = territory.name + ' Territory';
            territoryBadge.style.background = 'var(--accent-brand)';
            territoryBadge.style.color = '#fff';
        } else {
            territoryBadge.textContent = 'No Territory Assigned';
            territoryBadge.style.background = 'var(--accent-orange)';
            territoryBadge.style.color = '#fff';
        }
    }

    // Filter support
    const bondTypeFilter = document.getElementById('exposure-bond-type-filter');
    const regionFilter = document.getElementById('exposure-region-filter');
    const bondType = bondTypeFilter ? bondTypeFilter.value : 'all';
    const regionVal = regionFilter ? regionFilter.value : 'all';

    // Populate region filter on first render — only territory-relevant regions
    if (regionFilter && regionFilter.options.length <= 1) {
        const filterableRegions = territoryRegionNames ? exposureRegions.filter(r => territoryRegionNames.includes(r.name)) : exposureRegions;
        filterableRegions.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.name;
            opt.textContent = r.name;
            regionFilter.appendChild(opt);
        });
    }

    const baseRegions = territoryRegionNames ? exposureRegions.filter(r => territoryRegionNames.includes(r.name)) : exposureRegions;
    const filtered = regionVal === 'all' ? baseRegions : baseRegions.filter(r => r.name === regionVal);
    const filteredTotal = filtered.reduce((s, r) => s + r.value, 0);
    const filteredBonds = filtered.reduce((s, r) => s + r.bonds, 0);

    // KPI Cards
    const kpiContainer = document.getElementById('exposure-kpi-cards');
    if (kpiContainer) {
        const eKpiStyle = 'cursor:pointer;transition:transform 0.15s ease,box-shadow 0.15s ease;';
        const eKpiHover = '" onmouseenter="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(0,0,0,0.1)\'" onmouseleave="this.style.transform=\'none\';this.style.boxShadow=\'none\'';
        kpiContainer.innerHTML = `
            <div class="exposure-kpi-card" style="${eKpiStyle}" onclick="openExposureKPIDrillDown('total')${eKpiHover}">
                <div class="exposure-kpi-label">Total Exposure</div>
                <div class="exposure-kpi-value brand">$${filteredTotal.toFixed(1)}M</div>
                <div class="exposure-kpi-sub">${filtered.length} active regions</div>
            </div>
            <div class="exposure-kpi-card" style="${eKpiStyle}" onclick="openExposureKPIDrillDown('bonds')${eKpiHover}">
                <div class="exposure-kpi-label">Active Bonds</div>
                <div class="exposure-kpi-value">${filteredBonds.toLocaleString()}</div>
                <div class="exposure-kpi-sub">Across all types</div>
            </div>
            <div class="exposure-kpi-card" style="${eKpiStyle}" onclick="openExposureKPIDrillDown('avgsize')${eKpiHover}">
                <div class="exposure-kpi-label">Avg Bond Size</div>
                <div class="exposure-kpi-value">$${(avgBondSize / 1000).toFixed(0)}K</div>
                <div class="exposure-kpi-sub">Per active bond</div>
            </div>
            <div class="exposure-kpi-card" style="${eKpiStyle}" onclick="openExposureKPIDrillDown('lossratio')${eKpiHover}">
                <div class="exposure-kpi-label">Avg Loss Ratio</div>
                <div class="exposure-kpi-value">${avgLossRatio}%</div>
                <div class="exposure-kpi-sub">Portfolio average</div>
            </div>
            <div class="exposure-kpi-card" style="${eKpiStyle}" onclick="openExposureKPIDrillDown('highest')${eKpiHover}">
                <div class="exposure-kpi-label">Highest Region</div>
                <div class="exposure-kpi-value brand">${highestRegion.abbr}</div>
                <div class="exposure-kpi-sub">$${highestRegion.value}M exposure</div>
            </div>
        `;
    }

    // Map Legend — show territory colors
    const legend = document.getElementById('map-legend');
    if (legend) {
        const userTerritory = getUserTerritory();
        const showTerritories = canSeeAllTerritories() ? sampleTerritories : (userTerritory ? [userTerritory] : sampleTerritories);
        const levels = showTerritories.map(t => ({ label: t.name, color: territoryColors[t.name] || '#6b9dc2' }));
        if (!canSeeAllTerritories()) levels.push({ label: 'Other Territories', color: '#d1d5db' });
        legend.innerHTML = levels.map(l =>
            `<span class="map-legend-item"><span class="map-legend-swatch" style="background:${l.color}"></span>${l.label}</span>`
        ).join('');
    }

    // SVG Map with individual state shapes colored by region
    const svg = document.getElementById('us-map-svg');
    if (svg) {
        // Build a lookup from region name to region data
        const regionByName = {};
        exposureRegions.forEach(r => { regionByName[r.name] = r; });

        svg.innerHTML = `
            <defs>
                <filter id="map-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.10"/>
                </filter>
            </defs>
            <rect width="960" height="600" fill="var(--bg-primary)" rx="8"/>
            ${usStates.map(s => {
                const r = regionByName[s.region];
                if (!r) return '';
                const inTerritory = !territoryStates || territoryStates.includes(s.id);
                const color = inTerritory ? getTerritoryColor(s.id) : '#d1d5db';
                const isFiltered = regionVal !== 'all' && r.name !== regionVal;
                const opacity = !inTerritory ? 0.3 : (isFiltered ? 0.15 : 1);
                return `<path d="${s.d}" fill="${color}" stroke="var(--bg-card)" stroke-width="0.8"
                    class="map-state" data-state="${s.id}" data-region="${s.region}" data-in-territory="${inTerritory}"
                    style="opacity:${opacity};cursor:${inTerritory ? 'pointer' : 'default'};transition:opacity 0.3s,fill 0.2s" ${inTerritory ? 'filter="url(#map-shadow)"' : ''}/>`;
            }).join('')}
            ${(() => {
                // State abbreviation labels — skip tiny NE states
                const skipLabels = ['CT','RI','MA','NH','VT','NJ','DE','DC','MD'];
                // Manual centroid overrides for states where auto-calc is off
                const stateOverrides = {
                    'HI': { x: 305, y: 555 }, 'AK': { x: 161, y: 495 },
                    'FL': { x: 760, y: 470 }, 'MI': { x: 669, y: 175 },
                    'LA': { x: 585, y: 445 }, 'ID': { x: 195, y: 145 },
                    'CA': { x: 110, y: 310 }, 'TX': { x: 470, y: 430 },
                    'OK': { x: 460, y: 365 }, 'WV': { x: 745, y: 272 },
                    'VA': { x: 790, y: 300 }, 'KY': { x: 690, y: 310 },
                    'NC': { x: 790, y: 330 }, 'TN': { x: 670, y: 335 },
                    'NY': { x: 835, y: 165 }, 'PA': { x: 800, y: 210 },
                    'SC': { x: 745, y: 385 }, 'MN': { x: 520, y: 130 },
                    'IA': { x: 530, y: 220 }, 'MO': { x: 545, y: 300 },
                    'AR': { x: 555, y: 375 }, 'MS': { x: 610, y: 410 },
                    'AL': { x: 660, y: 405 }, 'GA': { x: 700, y: 395 },
                    'IN': { x: 645, y: 265 }, 'OH': { x: 710, y: 240 },
                    'IL': { x: 595, y: 270 }, 'WI': { x: 575, y: 165 },
                    'NE': { x: 435, y: 240 }, 'KS': { x: 445, y: 295 },
                    'SD': { x: 425, y: 170 }, 'ND': { x: 425, y: 95 }
                };
                return usStates.map(s => {
                    if (skipLabels.includes(s.id)) return '';
                    const inTerritory = !territoryStates || territoryStates.includes(s.id);
                    if (!inTerritory) return '';
                    const isFiltered = regionVal !== 'all' && s.region !== regionVal;
                    if (isFiltered) return '';
                    let cx, cy;
                    if (stateOverrides[s.id]) {
                        cx = stateOverrides[s.id].x;
                        cy = stateOverrides[s.id].y;
                    } else {
                        const nums = s.d.match(/[\d.]+/g);
                        if (!nums) return '';
                        let sumX = 0, sumY = 0, count = 0;
                        for (let i = 0; i < nums.length - 1; i += 2) {
                            sumX += parseFloat(nums[i]);
                            sumY += parseFloat(nums[i + 1]);
                            count++;
                        }
                        cx = Math.round(sumX / count);
                        cy = Math.round(sumY / count);
                    }
                    return `<text x="${cx}" y="${cy}" class="map-state-label" data-state="${s.id}">${s.id}</text>`;
                }).join('');
            })()}
            ${exposureRegions.map(r => {
                // Manual centroid overrides for small/crowded regions
                const labelOverrides = {
                    'Northeast': { x: 880, y: 145 },
                    'Mid-Atlantic': { x: 845, y: 250 },
                    'Pacific': { x: 120, y: 295 },
                    'Northwest': { x: 195, y: 150 },
                    'Gulf Coast': { x: 570, y: 405 },
                    'Southeast': { x: 720, y: 380 }
                };
                let cx, cy;
                if (labelOverrides[r.name]) {
                    cx = labelOverrides[r.name].x;
                    cy = labelOverrides[r.name].y;
                } else {
                    const regionStates = usStates.filter(s => s.region === r.name && s.id !== 'AK' && s.id !== 'HI');
                    if (regionStates.length === 0) return '';
                    let sumX = 0, sumY = 0, count = 0;
                    regionStates.forEach(s => {
                        const nums = s.d.match(/[\d.]+/g);
                        if (nums) {
                            for (let i = 0; i < nums.length - 1; i += 2) {
                                sumX += parseFloat(nums[i]);
                                sumY += parseFloat(nums[i + 1]);
                                count++;
                            }
                        }
                    });
                    cx = Math.round(sumX / count);
                    cy = Math.round(sumY / count);
                }
                const isFiltered = regionVal !== 'all' && r.name !== regionVal;
                const inTerritoryRegion = !territoryRegionNames || territoryRegionNames.includes(r.name);
                if (isFiltered || !inTerritoryRegion) return '';
                return `<text x="${cx}" y="${cy - 6}" class="map-region-label" data-region="${r.name}">${r.abbr}</text>
                        <text x="${cx}" y="${cy + 8}" class="map-region-value" data-region="${r.name}">$${r.value}M</text>`;
            }).join('')}
        `;

        // Tooltips — hover on individual states shows region data
        const tooltip = document.getElementById('map-tooltip');
        const mapContainer = document.getElementById('exposure-map');
        svg.querySelectorAll('.map-state').forEach(stateEl => {
            stateEl.addEventListener('mouseenter', function () {
                if (this.dataset.inTerritory === 'false') return;
                const regionName = this.dataset.region;
                const r = exposureRegions.find(x => x.name === regionName);
                if (!r) return;
                const lrColor = r.lossRatio > 3.5 ? 'var(--accent-red)' : r.lossRatio > 2.5 ? 'var(--accent-orange)' : 'var(--accent-green)';
                tooltip.innerHTML = `
                    <div class="map-tooltip-title">${r.name} <span style="font-weight:400;font-size:11px;color:var(--text-muted)">(${this.dataset.state})</span></div>
                    <div class="map-tooltip-row"><span>Total Exposure</span><span>$${r.value}M</span></div>
                    <div class="map-tooltip-row"><span>Active Bonds</span><span>${r.bonds}</span></div>
                    <div class="map-tooltip-row"><span>Avg Bond Size</span><span>$${Math.round(r.value * 1000000 / r.bonds).toLocaleString()}</span></div>
                    <div class="map-tooltip-row"><span>Loss Ratio</span><span style="color:${lrColor}">${r.lossRatio}%</span></div>
                    <div class="map-tooltip-row"><span>Largest Bond</span><span>$${(r.largestBond / 1000000).toFixed(1)}M</span></div>
                    <div class="map-tooltip-row"><span>Contract Surety</span><span>$${r.type.contract}M</span></div>
                    <div class="map-tooltip-row"><span>Commercial Surety</span><span>$${r.type.commercial}M</span></div>
                    <div class="map-tooltip-row"><span>Risk Level</span><span style="font-weight:700">${getHeatLabel(r.value)}</span></div>
                    <div class="map-tooltip-bar"><div class="map-tooltip-bar-fill" style="width:${(r.value / maxExposure * 100).toFixed(0)}%;background:${getTerritoryColor(this.dataset.state)}"></div></div>
                `;
                tooltip.style.display = 'block';
                // Highlight all states in same region
                svg.querySelectorAll('.map-state').forEach(el => {
                    if (el.dataset.region === regionName) el.style.strokeWidth = '1.5';
                });
            });
            stateEl.addEventListener('mousemove', function (e) {
                const rect = mapContainer.getBoundingClientRect();
                let left = e.clientX - rect.left + 15;
                let top = e.clientY - rect.top - 10;
                if (left + 240 > rect.width) left = e.clientX - rect.left - 250;
                if (top + 200 > rect.height) top = e.clientY - rect.top - 200;
                tooltip.style.left = left + 'px';
                tooltip.style.top = top + 'px';
            });
            stateEl.addEventListener('mouseleave', function () {
                tooltip.style.display = 'none';
                svg.querySelectorAll('.map-state').forEach(el => { el.style.strokeWidth = '0.8'; });
            });
        });
    }

    // Sidebar: Exposure by Type donut
    const donutContainer = document.getElementById('exposure-type-donut');
    if (donutContainer) {
        const totalContract = filtered.reduce((s, r) => s + r.type.contract, 0);
        const totalCommercial = filtered.reduce((s, r) => s + r.type.commercial, 0);
        const donutTotal = totalContract + totalCommercial;
        const contractPct = donutTotal ? (totalContract / donutTotal * 100) : 0;
        const commercialPct = donutTotal ? (totalCommercial / donutTotal * 100) : 0;
        const circumference = 2 * Math.PI * 52;
        const contractDash = circumference * contractPct / 100;
        const commercialDash = circumference * commercialPct / 100;

        donutContainer.innerHTML = `
            <div class="exposure-donut-wrap">
                <svg width="130" height="130" viewBox="0 0 130 130">
                    <circle cx="65" cy="65" r="52" fill="none" stroke="var(--bg-primary)" stroke-width="18"/>
                    <circle cx="65" cy="65" r="52" fill="none" stroke="var(--accent-brand)" stroke-width="18"
                        stroke-dasharray="${contractDash} ${circumference}" stroke-dashoffset="0"
                        transform="rotate(-90 65 65)" style="transition: stroke-dasharray 0.6s ease"/>
                    <circle cx="65" cy="65" r="52" fill="none" stroke="var(--accent-blue)" stroke-width="18"
                        stroke-dasharray="${commercialDash} ${circumference}" stroke-dashoffset="${-contractDash}"
                        transform="rotate(-90 65 65)" style="transition: stroke-dasharray 0.6s ease"/>
                    <text x="65" y="62" text-anchor="middle" font-size="16" font-weight="700" fill="var(--text-primary)">$${donutTotal.toFixed(1)}M</text>
                    <text x="65" y="78" text-anchor="middle" font-size="9" fill="var(--text-muted)">TOTAL</text>
                </svg>
                <div class="exposure-donut-legend">
                    <div class="exposure-donut-legend-item">
                        <span class="exposure-donut-legend-dot" style="background:var(--accent-brand)"></span>
                        <span>Contract Surety</span>
                        <span class="exposure-donut-legend-val">$${totalContract.toFixed(1)}M</span>
                    </div>
                    <div class="exposure-donut-legend-item">
                        <span class="exposure-donut-legend-dot" style="background:var(--accent-blue)"></span>
                        <span>Commercial Surety</span>
                        <span class="exposure-donut-legend-val">$${totalCommercial.toFixed(1)}M</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Sidebar: Top Regions bar chart
    const barsContainer = document.getElementById('exposure-bars');
    if (barsContainer) {
        const sorted = [...filtered].sort((a, b) => b.value - a.value);
        const barMax = sorted.length > 0 ? sorted[0].value : 1;
        barsContainer.innerHTML = '<h3>Top Regions by Exposure</h3>' + sorted.map(r => {
            const color = territoryColors[r.name] || '#6b9dc2';
            return `<div class="exposure-bar-item">
                <div class="exposure-bar-label"><span>${r.name}</span><span>$${r.value}M</span></div>
                <div class="exposure-bar-track"><div class="exposure-bar-fill" style="width:${(r.value / barMax * 100).toFixed(1)}%;background:${color}"></div></div>
            </div>`;
        }).join('');
    }

    // Sidebar: Summary
    const summaryContainer = document.getElementById('exposure-summary');
    if (summaryContainer) {
        const upRegions = filtered.filter(r => r.trend === 'up').length;
        const downRegions = filtered.filter(r => r.trend === 'down').length;
        summaryContainer.innerHTML = `
            <h3>Summary</h3>
            <div class="summary-row"><span>Total Exposure</span><strong>$${filteredTotal.toFixed(1)}M</strong></div>
            <div class="summary-row"><span>Total Bonds</span><strong>${filteredBonds.toLocaleString()}</strong></div>
            <div class="summary-row"><span>Avg Bond Size</span><strong>$${Math.round(filteredTotal * 1000000 / (filteredBonds || 1)).toLocaleString()}</strong></div>
            <div class="summary-row"><span>Highest Region</span><strong>${highestRegion.name}</strong></div>
            <div class="summary-row"><span>Trending Up</span><strong class="exposure-trend-up">${upRegions} region${upRegions !== 1 ? 's' : ''}</strong></div>
            <div class="summary-row"><span>Trending Down</span><strong class="exposure-trend-down">${downRegions} region${downRegions !== 1 ? 's' : ''}</strong></div>
            <div class="summary-row"><span>Avg Loss Ratio</span><strong>${avgLossRatio}%</strong></div>
        `;
    }

    // Detail Data Table
    const tbody = document.getElementById('exposure-table-body');
    if (tbody) {
        const sorted = [...filtered].sort((a, b) => b.value - a.value);
        tbody.innerHTML = sorted.map(r => {
            const trendIcon = r.trend === 'up' ? '&#9650;' : r.trend === 'down' ? '&#9660;' : '&#9644;';
            const trendClass = r.trend === 'up' ? 'exposure-trend-up' : r.trend === 'down' ? 'exposure-trend-down' : 'exposure-trend-flat';
            const lrColor = r.lossRatio > 3.5 ? 'color:var(--accent-red)' : r.lossRatio > 2.5 ? 'color:var(--accent-orange)' : 'color:var(--accent-green)';
            return `<tr>
                <td><strong>${r.name}</strong></td>
                <td>$${r.value}M</td>
                <td>${r.bonds}</td>
                <td>$${Math.round(r.value * 1000000 / r.bonds).toLocaleString()}</td>
                <td><span style="${lrColor};font-weight:600">${r.lossRatio}%</span></td>
                <td>$${(r.largestBond / 1000000).toFixed(1)}M</td>
                <td><span class="${trendClass}">${trendIcon} ${Math.abs(r.trendPct)}%</span></td>
            </tr>`;
        }).join('');
    }
}

function initMapTooltips() {
    // Tooltips now handled inside renderExposureMap()
}

// ==================== EXPOSURE KPI DRILL-DOWN ====================
function openExposureKPIDrillDown(type) {
    // Re-derive exposureRegions from renderExposureMap scope — they are local to that function
    // We need to access the data; since exposureRegions is defined inside renderExposureMap, we re-read it here
    const exposureRegions = [
        { name: 'Pacific', abbr: 'PAC', value: 24.8, bonds: 347, lossRatio: 2.1, largestBond: 4200000, trend: 'up', trendPct: 8.3, type: { contract: 18.6, commercial: 6.2 } },
        { name: 'Northwest', abbr: 'NW', value: 4.2, bonds: 63, lossRatio: 1.4, largestBond: 890000, trend: 'flat', trendPct: 0.2, type: { contract: 2.8, commercial: 1.4 } },
        { name: 'Mountain', abbr: 'MTN', value: 7.6, bonds: 112, lossRatio: 1.8, largestBond: 1500000, trend: 'up', trendPct: 3.1, type: { contract: 5.1, commercial: 2.5 } },
        { name: 'Southwest', abbr: 'SW', value: 9.4, bonds: 156, lossRatio: 3.2, largestBond: 2100000, trend: 'down', trendPct: -2.4, type: { contract: 7.0, commercial: 2.4 } },
        { name: 'Plains', abbr: 'PLN', value: 5.8, bonds: 87, lossRatio: 1.2, largestBond: 750000, trend: 'up', trendPct: 1.5, type: { contract: 4.0, commercial: 1.8 } },
        { name: 'Gulf Coast', abbr: 'GC', value: 8.3, bonds: 124, lossRatio: 4.5, largestBond: 1850000, trend: 'down', trendPct: -5.2, type: { contract: 5.8, commercial: 2.5 } },
        { name: 'Great Lakes', abbr: 'GL', value: 11.2, bonds: 198, lossRatio: 2.8, largestBond: 2800000, trend: 'up', trendPct: 4.7, type: { contract: 7.8, commercial: 3.4 } },
        { name: 'Southeast', abbr: 'SE', value: 14.6, bonds: 234, lossRatio: 3.6, largestBond: 3500000, trend: 'up', trendPct: 6.1, type: { contract: 10.2, commercial: 4.4 } },
        { name: 'Mid-Atlantic', abbr: 'MA', value: 18.4, bonds: 289, lossRatio: 2.4, largestBond: 5100000, trend: 'up', trendPct: 7.8, type: { contract: 13.0, commercial: 5.4 } },
        { name: 'New England', abbr: 'NE', value: 6.1, bonds: 95, lossRatio: 1.9, largestBond: 1200000, trend: 'flat', trendPct: 0.8, type: { contract: 4.2, commercial: 1.9 } }
    ];

    const totalExposure = exposureRegions.reduce((s, r) => s + r.value, 0);
    const totalBonds = exposureRegions.reduce((s, r) => s + r.bonds, 0);

    let title = '';
    let sorted = [];
    let sortCol = '';

    if (type === 'total') {
        title = 'Total Exposure — By Region';
        sorted = [...exposureRegions].sort((a, b) => b.value - a.value);
        sortCol = 'exposure';
    } else if (type === 'bonds') {
        title = 'Active Bonds — By Region';
        sorted = [...exposureRegions].sort((a, b) => b.bonds - a.bonds);
        sortCol = 'bonds';
    } else if (type === 'avgsize') {
        title = 'Average Bond Size — By Region';
        sorted = [...exposureRegions].sort((a, b) => (b.value * 1000000 / b.bonds) - (a.value * 1000000 / a.bonds));
        sortCol = 'avgsize';
    } else if (type === 'lossratio') {
        title = 'Loss Ratio — By Region';
        sorted = [...exposureRegions].sort((a, b) => b.lossRatio - a.lossRatio);
        sortCol = 'lossratio';
    } else if (type === 'highest') {
        title = 'Highest Exposure Region — Detail';
        const highest = exposureRegions.reduce((a, b) => a.value > b.value ? a : b);
        sorted = [highest];
        sortCol = 'exposure';
    }

    const thStyle = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';

    let rows = sorted.map(r => {
        const avgSize = Math.round(r.value * 1000000 / r.bonds);
        const pctOfTotal = ((r.value / totalExposure) * 100).toFixed(1);
        const barWidth = Math.max(2, (r.value / totalExposure) * 100);
        const lrColor = r.lossRatio > 3.5 ? 'var(--accent-red)' : r.lossRatio > 2.5 ? 'var(--accent-orange)' : 'var(--accent-green)';
        const trendIcon = r.trend === 'up' ? '\u25B2' : r.trend === 'down' ? '\u25BC' : '\u25CF';
        const trendColor = r.trend === 'up' ? 'var(--accent-green)' : r.trend === 'down' ? 'var(--accent-red)' : 'var(--text-muted)';
        return `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;">${r.name} <span style="color:var(--text-muted);font-weight:400;">(${r.abbr})</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;">$${r.value}M</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;">${r.bonds}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;">$${(avgSize / 1000).toFixed(0)}K</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;"><span style="color:${lrColor};font-weight:600;">${r.lossRatio}%</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;">$${(r.largestBond / 1000000).toFixed(1)}M</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;"><span style="color:${trendColor};font-weight:600;">${trendIcon} ${Math.abs(r.trendPct)}%</span></td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;width:90px;">
                <div style="background:#e5e7eb;border-radius:4px;height:8px;width:100%;"><div style="background:var(--accent-brand);border-radius:4px;height:8px;width:${barWidth}%;"></div></div>
                <div style="font-size:10px;color:var(--text-muted);margin-top:2px;text-align:center;">${pctOfTotal}%</div>
            </td>
        </tr>`;
    }).join('');

    const avgLR = (exposureRegions.reduce((s, r) => s + r.lossRatio, 0) / exposureRegions.length).toFixed(1);
    const avgBondSize = Math.round((totalExposure * 1000000) / totalBonds);

    const body = `<div style="max-height:480px;overflow-y:auto;">
        <table style="width:100%;border-collapse:collapse;">
            <thead><tr>
                <th style="${thStyle}text-align:left;">Region</th>
                <th style="${thStyle}text-align:right;">Exposure</th>
                <th style="${thStyle}text-align:center;">Bonds</th>
                <th style="${thStyle}text-align:right;">Avg Size</th>
                <th style="${thStyle}text-align:center;">Loss Ratio</th>
                <th style="${thStyle}text-align:right;">Largest Bond</th>
                <th style="${thStyle}text-align:center;">Trend</th>
                <th style="${thStyle}text-align:center;">% of Total</th>
            </tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr style="background:#f8f9fa;font-weight:600;">
                <td style="padding:10px 12px;font-size:13px;">Total: ${sorted.length} Region${sorted.length !== 1 ? 's' : ''}</td>
                <td style="padding:10px 12px;font-size:13px;text-align:right;">$${totalExposure.toFixed(1)}M</td>
                <td style="padding:10px 12px;font-size:13px;text-align:center;">${totalBonds.toLocaleString()}</td>
                <td style="padding:10px 12px;font-size:13px;text-align:right;">$${(avgBondSize / 1000).toFixed(0)}K</td>
                <td style="padding:10px 12px;font-size:13px;text-align:center;">${avgLR}%</td>
                <td colspan="3"></td>
            </tr></tfoot>
        </table>
    </div>`;
    const footer = '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    openModal(title + ' — Exposure Breakdown', body, footer);
    document.getElementById('modal-container').style.maxWidth = '960px';
}

// ==================== MODAL FUNCTIONS ====================

function openModal(title, bodyHTML, footerHTML) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHTML;
    document.getElementById('modal-footer').innerHTML = footerHTML || '';
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeAllModals() {
    document.getElementById('modal-overlay').style.display = 'none';
}

function openCreateFSModal() {
    const body = `
        <div class="form-grid">
            <div class="form-group"><label class="form-label">Statement Type (FR-1)</label><select class="form-select"><option>Annual CPA</option><option>Interim</option></select></div>
            <div class="form-group"><label class="form-label">Template</label><select class="form-select"><option>Standard</option><option>Simple</option></select></div>
            <div class="form-group"><label class="form-label">Statement Date (Period End)</label><input type="date" class="form-input" value="2024-04-15"></div>
            <div class="form-group"><label class="form-label">Date Received (FR-1)</label><input type="date" class="form-input" value="2024-04-15"></div>
            <div class="form-group"><label class="form-label">Term (Months)</label><input type="number" class="form-input" value="12"></div>
            <div class="form-group"><label class="form-label">Fiscal Year End?</label><select class="form-select"><option>Yes</option><option>No</option></select></div>
            <div class="form-group"><label class="form-label">Source (FR-1)</label><select class="form-select"><option>Agent</option><option>Principal</option><option>System Upload</option></select></div>
            <div class="form-group"><label class="form-label">Preparer</label><input type="text" class="form-input" value="Jake Miller"></div>
            <div class="form-group"><label class="form-label">Accounting Firm</label><input type="text" class="form-input" placeholder="Enter firm name..."></div>
            <div class="form-group"><label class="form-label">Audit Status</label><select class="form-select"><option>Audited</option><option>Reviewed</option><option>Compiled</option><option>Company Prepared</option></select></div>
            <div class="form-group"><label class="form-label">Currency / Denomination</label><select class="form-select"><option>USD - Dollars</option><option>USD - Thousands</option><option>USD - Millions</option></select></div>
        </div>
        <div style="margin-top:12px; padding:10px; background:#fff8e1; border-radius:6px; font-size:12px; color:#795548;">
            <strong>BR-1 / FR-3:</strong> Receiving this financial statement will trigger an ARR due within 14 calendar days of the Date Received above.
        </div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Cancel</button><button class="btn btn-primary" onclick="closeAllModals()">Create Statement</button>`;
    openModal('Create Financial Statement', body, footer);
}

function openFSComplianceModal() {
    const rows = [];
    Object.keys(accountProfiles).forEach(acctName => {
        const isMyAccount = sampleARRs.some(a => a.account === acctName && a.assignee === currentUser.name);
        if (!isMyAccount) return;
        const compliance = checkFSCompliance(acctName);
        if (!compliance.compliant) {
            compliance.issues.forEach(issue => {
                rows.push({ account: acctName, type: issue.type, message: issue.message });
            });
        }
    });

    let body;
    if (rows.length === 0) {
        body = '<p style="text-align:center; color:var(--text-muted); padding:24px 0;">All accounts are compliant — no FS issues found.</p>';
    } else {
        const tableRows = rows.map(r => {
            const sevClass = r.type === 'urgent' ? 'sev-urgent' : 'sev-warning';
            const sevLabel = r.type === 'urgent' ? 'Urgent' : 'Warning';
            return `<tr>
                <td>${accountLink(r.account)}</td>
                <td><span class="compliance-sev ${sevClass}">${sevLabel}</span></td>
                <td>${r.message}</td>
            </tr>`;
        }).join('');
        body = `<table class="compliance-table">
            <thead><tr><th>Account</th><th>Severity</th><th>Details</th></tr></thead>
            <tbody>${tableRows}</tbody>
        </table>`;
    }

    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Close</button>`;
    openModal('FS Compliance Issues (' + rows.length + ')', body, footer);
}

function openFSDetail(fsId) {
    const body = `
        <div style="margin-bottom:16px; display:flex; justify-content:space-between;">
            <div><strong>Statement:</strong> ${fsId} &nbsp; <strong>Date:</strong> 12/31/2023 &nbsp; <strong>Term:</strong> 12 Mo.</div>
            <div><span class="status-badge balanced">Balanced</span></div>
        </div>
        <h3 style="font-size:14px; margin-bottom:10px;">Current Assets</h3>
        <div class="table-container" style="margin-bottom:16px;">
            <table class="data-table">
                <thead><tr><th>Account #</th><th>GL Account</th><th>As Given</th><th>Adjustments</th><th>As Allowed</th><th>Notes</th></tr></thead>
                <tbody>
                    <tr><td>1010</td><td>Cash & Equivalents</td><td>$2,450,000</td><td>$0</td><td>$2,450,000</td><td><button class="action-btn">Note</button></td></tr>
                    <tr><td>1020</td><td>Accounts Receivable</td><td>$4,800,000</td><td>($150,000)</td><td>$4,650,000</td><td><button class="action-btn">Note</button></td></tr>
                    <tr><td>1030</td><td>Costs in Excess of Billings</td><td>$1,200,000</td><td>$0</td><td>$1,200,000</td><td><button class="action-btn">Note</button></td></tr>
                    <tr><td>1050</td><td>Inventory / Materials</td><td>$380,000</td><td>$0</td><td>$380,000</td><td><button class="action-btn">Note</button></td></tr>
                    <tr><td>1060</td><td>Prepaid Expenses</td><td>$220,000</td><td>$0</td><td>$220,000</td><td><button class="action-btn">Note</button></td></tr>
                </tbody>
                <tfoot><tr><td></td><td style="font-weight:700;">Total Current Assets</td><td style="font-weight:700;">$9,050,000</td><td style="font-weight:700;">($150,000)</td><td style="font-weight:700;">$8,900,000</td><td></td></tr></tfoot>
            </table>
        </div>
        <h3 style="font-size:14px; margin-bottom:10px;">Fixed Assets</h3>
        <div class="table-container">
            <table class="data-table">
                <thead><tr><th>Account #</th><th>GL Account</th><th>As Given</th><th>Adjustments</th><th>As Allowed</th><th>Notes</th></tr></thead>
                <tbody>
                    <tr><td>1510</td><td>Property, Plant & Equipment</td><td>$18,500,000</td><td>$0</td><td>$18,500,000</td><td><button class="action-btn">Note</button></td></tr>
                    <tr><td>1520</td><td>Less: Accumulated Depreciation</td><td>($6,200,000)</td><td>$0</td><td>($6,200,000)</td><td><button class="action-btn">Note</button></td></tr>
                    <tr><td>1550</td><td>Intangible Assets</td><td>$450,000</td><td>($450,000)</td><td>$0</td><td><button class="action-btn">Note</button></td></tr>
                </tbody>
                <tfoot><tr><td></td><td style="font-weight:700;">Total Fixed Assets</td><td style="font-weight:700;">$12,750,000</td><td style="font-weight:700;">($450,000)</td><td style="font-weight:700;">$12,300,000</td><td></td></tr></tfoot>
            </table>
        </div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Close</button>`;
    openModal('Financial Statement Detail — ' + fsId, body, footer);
    // Widen modal for FS detail
    document.getElementById('modal-container').style.maxWidth = '840px';
}

function openCreateWIPModal() {
    const body = `
        <div class="form-grid">
            <div class="form-group"><label class="form-label">Schedule Date</label><input type="date" class="form-input" value="2024-04-15"></div>
            <div class="form-group"><label class="form-label">Schedule Type</label><select class="form-select"><option>FYE</option><option>Interim</option></select></div>
            <div class="form-group"><label class="form-label">Currency</label><select class="form-select"><option>USD</option></select></div>
            <div class="form-group"><label class="form-label">Denomination</label><select class="form-select"><option>Dollars</option><option>Thousands</option></select></div>
        </div>
        <p style="font-size:12px; color:var(--text-muted); margin-top:8px;">After creation, you can add job entries to the WIP schedule.</p>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Cancel</button><button class="btn btn-primary" onclick="closeAllModals()">Create Schedule</button>`;
    openModal('Create WIP Schedule', body, footer);
}

function openStartReviewModal() {
    const body = `
        <div class="form-grid">
            <div class="form-group"><label class="form-label">Review Type</label><select class="form-select"><option>Annual</option><option>Interim</option><option>Submission</option></select></div>
            <div class="form-group"><label class="form-label">Party Name</label><select class="form-select"><option>R.J. Corman Railroad Group</option><option>Hensel Phelps Construction Co</option><option>Turner Construction Company</option></select></div>
            <div class="form-group"><label class="form-label">Financial Statement Date</label><input type="date" class="form-input" value="2023-12-31"></div>
            <div class="form-group"><label class="form-label">Review Level</label><select class="form-select"><option>Branch</option><option>Region</option><option>CAO</option></select></div>
        </div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Cancel</button><button class="btn btn-primary" onclick="closeAllModals(); openARDetail(0)">Start Review</button>`;
    openModal('Start Account Review', body, footer);
}

function openReassignModal() {
    const body = `
        <div class="form-grid">
            <div class="form-group"><label class="form-label">New Reviewer</label><select class="form-select"><option>Sarah Mitchell</option><option>Mike Torres</option><option>Lisa Chen</option></select></div>
            <div class="form-group"><label class="form-label">Reason</label><select class="form-select"><option>Workload Balancing</option><option>Vacation Coverage</option><option>Expertise Required</option></select></div>
        </div>
        <div class="form-group" style="margin-top:14px;">
            <label class="form-label">Email Subject</label>
            <input type="text" class="form-input" value="Account Review Reassignment — R.J. Corman Railroad Group">
        </div>
        <div class="form-group" style="margin-top:14px;">
            <label class="form-label">Email Body Message</label>
            <textarea class="form-textarea" rows="3">This account review has been reassigned to you. Please review at your earliest convenience.</textarea>
        </div>
        <label class="form-check" style="margin-top:14px;"><input type="checkbox" checked> CC myself on notification email</label>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Cancel</button><button class="btn btn-primary" onclick="closeAllModals()">Reassign</button>`;
    openModal('Reassign Account Review', body, footer);
}

function openBidNotes(bidIdx) {
    const bid = sampleBidLog[bidIdx];
    const body = `
        <div style="margin-bottom:16px; font-size:13px; color:var(--text-muted);">Project: ${bid.projectName}</div>
        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
            <div style="padding:12px; background:var(--bg-card); border-radius:var(--radius-sm); border:1px solid var(--border-color);">
                <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><strong style="font-size:13px;">Jake Miller</strong><span style="font-size:11px; color:var(--text-muted);">04/15/2024 2:30 PM</span></div>
                <div style="font-size:13px; color:var(--text-secondary);">Bid submitted. Awaiting results from obligee. Pre-qualified for this project.</div>
            </div>
            <div style="padding:12px; background:var(--bg-card); border-radius:var(--radius-sm); border:1px solid var(--border-color);">
                <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><strong style="font-size:13px;">System</strong><span style="font-size:11px; color:var(--text-muted);">04/15/2024 10:00 AM</span></div>
                <div style="font-size:13px; color:var(--text-secondary);">Bid log entry created.</div>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Add Note</label>
            <textarea class="form-textarea" rows="3" placeholder="Enter a note..."></textarea>
        </div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Close</button><button class="btn btn-primary" onclick="closeAllModals()">Add Note</button>`;
    openModal('Bid Log Notes', body, footer);
}

// ==================== VIEW CONTROL FUNCTIONS ====================

function toggleLOAGrid() {
    const grid = document.getElementById('loa-grid');
    const chevron = document.getElementById('loa-chevron');
    if (grid.style.display === 'none') {
        grid.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
    } else {
        grid.style.display = 'none';
        chevron.style.transform = 'rotate(0)';
    }
}

function switchWIPTab(tabName) {
    // Reset all WIP tabs
    document.querySelectorAll('.wip-tab-content').forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
    document.querySelectorAll('[data-wiptab]').forEach(b => b.classList.remove('active'));

    // Show target tab
    const targetTab = document.getElementById('wip-tab-' + tabName);
    if (targetTab) { targetTab.classList.add('active'); targetTab.style.display = 'block'; }

    const btn = document.querySelector(`[data-wiptab="${tabName}"]`);
    if (btn) btn.classList.add('active');
}

function openWIPDetail(idx) {
    renderWIPDetail(idx);
    // Hide schedules tab, show detail
    document.querySelectorAll('.wip-tab-content').forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
    document.getElementById('wip-tab-detail').style.display = 'block';
    document.getElementById('wip-tab-detail').classList.add('active');
}

function closeWIPDetail() {
    switchWIPTab('schedules');
}

let currentARIndex = 0;

function openARDetail(idx) {
    currentARIndex = idx;
    const review = sampleAccountReviews[idx];
    document.getElementById('ar-detail-title').textContent = 'Account Review — ' + review.reviewDate;
    document.getElementById('ar-detail-status').textContent = 'Status: ' + review.reviewState;
    document.getElementById('ar-detail-meta').textContent = 'Review Type: ' + review.reviewType + ' | Review Level: ' + review.reviewLevel;

    // Show detail, hide summary
    document.getElementById('ar-summary-page').style.display = 'none';
    document.getElementById('ar-detail-page').style.display = 'block';

    // Render section nav and first section content
    renderARSectionNav();
    renderARSectionContent('ar-info');
}

function closeARDetail() {
    document.getElementById('ar-summary-page').style.display = 'block';
    document.getElementById('ar-detail-page').style.display = 'none';
    // Reset modal width if it was changed
    document.getElementById('modal-container').style.maxWidth = '';
}

// BR-5: Frequency Override Modal
function openFrequencyOverrideModal() {
    const acctName = 'R.J. Corman Railroad Group';
    const currentFreq = getRequiredFrequency(acctName);
    const freqOptions = ['Annual', 'Semi-Annual', 'Quarterly'].map(f =>
        `<option${f === currentFreq.frequency ? ' selected' : ''}>${f}</option>`
    ).join('');
    const approverOptions = ['Jake Miller', 'Max Miller', 'John Webster', 'Ken Bearley'].map(a =>
        `<option>${a} (${chainTitles[a] || ''})</option>`
    ).join('');
    const body = `
        <div style="margin-bottom:12px; padding:10px; background:#fff8e1; border-radius:6px; font-size:12px; color:#795548;">
            <strong>BR-5:</strong> A supervisor may override the standard review frequency. The approver, date, and rationale must be recorded for the audit trail (FR-8).
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Current Frequency</label>
                <input type="text" class="form-input" value="${currentFreq.frequency} (${currentFreq.source})" disabled>
            </div>
            <div class="form-group">
                <label class="form-label">New Frequency</label>
                <select class="form-select" id="override-new-freq">${freqOptions}</select>
            </div>
            <div class="form-group">
                <label class="form-label">Approving Supervisor</label>
                <select class="form-select" id="override-approver">${approverOptions}</select>
            </div>
            <div class="form-group">
                <label class="form-label">Override Date</label>
                <input type="date" class="form-input" id="override-date" value="2024-04-15">
            </div>
        </div>
        <div class="form-group" style="margin-top:12px;">
            <label class="form-label">Rationale (required)</label>
            <textarea class="form-textarea" rows="3" id="override-rationale" placeholder="Explain why the standard frequency should be changed..."></textarea>
        </div>`;
    const footer = `
        <button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>
        <button class="btn btn-primary" onclick="applyFrequencyOverride()">Apply Override</button>`;
    openModal('Request Frequency Override (BR-5)', body, footer);
}

function applyFrequencyOverride() {
    const newFreq = document.getElementById('override-new-freq').value;
    const approverRaw = document.getElementById('override-approver').value;
    const approver = approverRaw.split(' (')[0];
    const rationale = document.getElementById('override-rationale').value;
    if (!rationale.trim()) {
        alert('Rationale is required per BR-5.');
        return;
    }
    const acctName = 'R.J. Corman Railroad Group';
    const profile = accountProfiles[acctName];
    if (profile) {
        profile.frequencyOverride = {
            newFrequency: newFreq,
            approver: approver,
            approvalDate: '04/15/2024',
            rationale: rationale
        };
    }
    closeAllModals();
    renderARSectionContent('sign-off');
    showToast('Frequency override applied: ' + newFreq + ' (approved by ' + approver + ')');
}

function promoteReview(idx) {
    const review = sampleAccountReviews[idx];
    const uw = review.originatingUW || currentUser.name;
    const chain = reviewChains[uw] || [];
    const fullChain = [uw, ...chain];
    const currentQ = review.currentQueue;
    const currentQIdx = fullChain.indexOf(currentQ);
    const nextReviewer = (currentQIdx >= 0 && currentQIdx < fullChain.length - 1) ? fullChain[currentQIdx + 1] : null;

    const today = new Date(2024, 3, 15);
    const dateStr = (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0') + '/' + today.getFullYear();

    // Add sign-off entry
    review.signOffHistory.push({
        reviewer: currentQ,
        title: chainTitles[currentQ] || '',
        action: nextReviewer ? 'Approved' : 'Final Approval',
        date: dateStr,
        state: nextReviewer ? 'Promoted to ' + (chainTitles[nextReviewer] || '') : 'Approved',
        comments: nextReviewer ? 'Promoted to ' + nextReviewer : 'Final approval granted'
    });

    // Move queue
    if (nextReviewer) {
        review.currentQueue = nextReviewer;
        review.queueEnteredDate = 'Apr 15, 2024';
        review.reviewState = 'In Review - ' + (chainTitles[nextReviewer] || '');
        alert('Review promoted to ' + nextReviewer + ' (' + (chainTitles[nextReviewer] || '') + ')');
    } else {
        review.currentQueue = null;
        review.queueEnteredDate = null;
        review.reviewState = 'Approved';
        alert('Review has received final approval.');
    }

    // Re-render current section and summary
    renderARSectionContent('sign-off');
    renderAccountReviewSummary();
}

function addBidRow() {
    sampleBidLog.push({
        bidDate: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        projectName: '', obligee: '', contractValue: 0, warranty: '', bidBondAmt: 0,
        potentialBacklog: 0, bidResult: '', bidResultAmt: 0, status: 'Pending Bid', doa: 'Branch'
    });
    renderBidLog();
}

// ==================== NEW BOND MODAL ====================

function openNewBondModal() {
    const body = `
        <div class="detail-grid">
            <div class="detail-item"><div class="detail-label">Principal</div><div class="detail-value"><input type="text" class="modal-input" id="nb-principal" placeholder="Company name"></div></div>
            <div class="detail-item"><div class="detail-label">Bond Type</div><div class="detail-value"><select class="modal-input" id="nb-type"><option>Contract Surety</option><option>Commercial Surety</option><option>Bid Bond</option><option>Performance Bond</option><option>Payment Bond</option></select></div></div>
            <div class="detail-item"><div class="detail-label">Bond Amount</div><div class="detail-value"><input type="text" class="modal-input" id="nb-amount" placeholder="$0.00"></div></div>
            <div class="detail-item"><div class="detail-label">Effective Date</div><div class="detail-value"><input type="date" class="modal-input" id="nb-eff"></div></div>
            <div class="detail-item"><div class="detail-label">Expiration Date</div><div class="detail-value"><input type="date" class="modal-input" id="nb-exp"></div></div>
            <div class="detail-item"><div class="detail-label">Obligee</div><div class="detail-value"><input type="text" class="modal-input" id="nb-obligee" placeholder="Obligee name"></div></div>
        </div>`;
    const footer = `
        <button class="btn btn-primary" onclick="submitNewBond()">Create Bond</button>
        <button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('Create New Bond', body, footer);
}

function submitNewBond() {
    const principal = document.getElementById('nb-principal').value || 'New Principal';
    const bondType = document.getElementById('nb-type').value;
    const amount = document.getElementById('nb-amount').value || '$500,000';
    const eff = document.getElementById('nb-eff').value ? new Date(document.getElementById('nb-eff').value).toLocaleDateString('en-US') : '04/28/2025';
    const exp = document.getElementById('nb-exp').value ? new Date(document.getElementById('nb-exp').value).toLocaleDateString('en-US') : '04/28/2026';
    sampleBonds.push({
        bondNumber: String(9000000 + sampleBonds.length + 1),
        principal, bondType, amount, effectiveDate: eff, expirationDate: exp, status: 'Active'
    });
    renderBonds();
    closeAllModals();
}

// ==================== NEW REQUEST MODAL ====================

function openNewRequestModal() {
    const body = `
        <div class="detail-grid">
            <div class="detail-item"><div class="detail-label">Account</div><div class="detail-value"><input type="text" class="modal-input" id="nr-account" placeholder="Account name"></div></div>
            <div class="detail-item"><div class="detail-label">Request Type</div><div class="detail-value"><select class="modal-input" id="nr-type"><option>New Bond</option><option>Renewal</option><option>Rider/Endorsement</option><option>Increase</option></select></div></div>
            <div class="detail-item"><div class="detail-label">Bond Amount</div><div class="detail-value"><input type="text" class="modal-input" id="nr-amount" placeholder="$0.00"></div></div>
            <div class="detail-item"><div class="detail-label">Priority</div><div class="detail-value"><select class="modal-input" id="nr-priority"><option>Normal</option><option>Urgent</option><option>Rush</option></select></div></div>
            <div class="detail-item" style="grid-column:1/-1;"><div class="detail-label">Description</div><div class="detail-value"><textarea class="modal-input" id="nr-desc" rows="3" placeholder="Request details..."></textarea></div></div>
        </div>`;
    const footer = `
        <button class="btn btn-primary" onclick="submitNewRequest()">Submit Request</button>
        <button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('New Bond Request', body, footer);
}

function submitNewRequest() {
    const account = document.getElementById('nr-account').value || 'New Account';
    const type = document.getElementById('nr-type').value;
    const amount = document.getElementById('nr-amount').value || '$250,000';
    sampleBondRequests.push({
        id: 'BR-2024-' + String(sampleBondRequests.length + 1).padStart(3, '0'),
        account, type, amount, status: 'Awaiting Approval', date: new Date().toLocaleDateString('en-US'),
        description: document.getElementById('nr-desc').value || type + ' request for ' + account
    });
    var maxBond = 3;
    try { maxBond = getDashboardPrefs().config.bondRequestsMaxCount || 3; } catch(e) {}
    renderBondRequests('bond-requests-list', sampleBondRequests.filter(b => b.assignee === currentUser.name).slice(0, maxBond));
    renderBondRequests('bond-requests-full-list', sampleBondRequests);
    closeAllModals();
}

// ==================== DELETE CONFIRMATION MODAL ====================

function openDeleteConfirm(itemType, itemId, callback) {
    const body = `<p style="color:var(--text-secondary); margin:12px 0;">Are you sure you want to delete this ${itemType}? This action cannot be undone.</p>
        <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:12px; margin-top:12px;">
            <strong style="color:#ef4444;">Item: ${itemId}</strong>
        </div>`;
    const footer = `
        <button class="btn btn-outline" style="background:rgba(239,68,68,0.15); color:#ef4444; border-color:#ef4444;" onclick="${callback}">Delete</button>
        <button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('Confirm Delete', body, footer);
    document.getElementById('modal-container').style.maxWidth = '480px';
}

function deleteAccountReview(idx) {
    sampleAccountReviews.splice(idx, 1);
    renderAccountReviewSummary();
    closeAllModals();
}

function deleteBidRow(idx) {
    sampleBidLog.splice(idx, 1);
    renderBidLog();
    closeAllModals();
}

// ==================== REPORT GENERATE / DOWNLOAD ====================

function openGenerateReportModal() {
    const body = `
        <div class="detail-grid">
            <div class="detail-item"><div class="detail-label">Report Type</div><div class="detail-value"><select class="modal-input" id="rpt-type"><option>Exposure Summary</option><option>Work in Progress</option><option>Account Review Summary</option><option>LOA Expiration Forecast</option><option>Claims & Loss Ratio</option><option>Premium & Commission</option></select></div></div>
            <div class="detail-item"><div class="detail-label">Date Range</div><div class="detail-value"><select class="modal-input" id="rpt-range"><option>Last 30 Days</option><option>Last 90 Days</option><option>Year to Date</option><option>Custom</option></select></div></div>
            <div class="detail-item"><div class="detail-label">Format</div><div class="detail-value"><select class="modal-input" id="rpt-format"><option>PDF</option><option>Excel</option><option>CSV</option></select></div></div>
        </div>`;
    const footer = `
        <button class="btn btn-primary" onclick="simulateGenerate()">Generate Report</button>
        <button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('Generate Report', body, footer);
}

function simulateGenerate() {
    const type = document.getElementById('rpt-type').value;
    document.getElementById('modal-body').innerHTML = '<div style="text-align:center; padding:30px 0;"><div class="spinner" style="margin:0 auto 16px;"></div><p style="color:var(--text-secondary);">Generating ' + type + '...</p></div>';
    document.getElementById('modal-footer').innerHTML = '';
    setTimeout(() => {
        document.getElementById('modal-body').innerHTML = '<div style="text-align:center; padding:30px 0;"><svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="width:48px; height:48px; margin-bottom:12px;"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><p style="color:var(--text-primary); font-weight:600; margin-bottom:4px;">Report Generated</p><p style="color:var(--text-muted); font-size:13px;">' + type + ' is ready for download.</p></div>';
        document.getElementById('modal-footer').innerHTML = '<button class="btn btn-primary" onclick="simulateDownload(\'' + type + '\')">Download</button><button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    }, 1500);
}

function simulateReportGenerate(reportName) {
    const body = '<div style="text-align:center; padding:30px 0;"><div class="spinner" style="margin:0 auto 16px;"></div><p style="color:var(--text-secondary);">Generating ' + reportName + '...</p></div>';
    openModal('Generating Report', body, '');
    setTimeout(() => {
        document.getElementById('modal-body').innerHTML = '<div style="text-align:center; padding:30px 0;"><svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="width:48px; height:48px; margin-bottom:12px;"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><p style="color:var(--text-primary); font-weight:600; margin-bottom:4px;">Report Ready</p><p style="color:var(--text-muted); font-size:13px;">' + reportName + ' has been generated.</p></div>';
        document.getElementById('modal-footer').innerHTML = '<button class="btn btn-primary" onclick="simulateDownload(\'' + reportName + '\')">Download</button><button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    }, 1500);
}

function simulateDownload(name) {
    closeAllModals();
    showToast('Downloaded: ' + name);
}

// ==================== EXPOSURE MAP EXPORT ====================

function exportExposureData() {
    const body = `
        <div class="detail-grid">
            <div class="detail-item"><div class="detail-label">Export Format</div><div class="detail-value"><select class="modal-input" id="exp-format"><option>CSV</option><option>Excel</option><option>PDF</option></select></div></div>
            <div class="detail-item"><div class="detail-label">Include</div><div class="detail-value"><select class="modal-input" id="exp-scope"><option>All Regions</option><option>Top 5 Only</option><option>Custom Selection</option></select></div></div>
        </div>
        <div class="table-container" style="margin-top:16px;">
            <table class="data-table"><thead><tr><th>Region</th><th>Exposure</th><th>Bonds</th></tr></thead>
            <tbody>
                <tr><td>Pacific</td><td>$24.8M</td><td>347</td></tr>
                <tr><td>Southeast</td><td>$21.5M</td><td>289</td></tr>
                <tr><td>Northeast</td><td>$18.2M</td><td>312</td></tr>
                <tr><td>Mid-Atlantic</td><td>$14.7M</td><td>245</td></tr>
                <tr><td>Great Lakes</td><td>$12.1M</td><td>198</td></tr>
            </tbody></table>
        </div>`;
    const footer = `
        <button class="btn btn-primary" onclick="simulateDownload('Exposure_Data')">Export</button>
        <button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('Export Exposure Data', body, footer);
}

// ==================== NOTIFICATION BELL ====================

const notifications = [
    { icon: '⚠️', text: 'ARR for Granite Construction is overdue by 15 days', time: '2h ago', type: 'warning' },
    { icon: '📋', text: 'New bond request BR-2024-010 awaiting approval', time: '3h ago', type: 'info' },
    { icon: '📝', text: 'LOA for R.J. Corman expires in 12 days', time: '5h ago', type: 'alert' },
    { icon: '💰', text: 'Financial statement FS-2024-001 approved', time: '1d ago', type: 'success' },
    { icon: '⚠️', text: 'Claim CLM-2024-003 investigation deadline approaching', time: '1d ago', type: 'warning' },
    { icon: '📋', text: 'WIP Schedule updated for Turner Construction', time: '2d ago', type: 'info' },
    { icon: '🔔', text: 'FR-3: 14-day ARR deadline approaching for Clark Construction (FS received 04/17)', time: '1h ago', type: 'warning' },
    { icon: '📊', text: 'BR-2: Granite Construction — Annual CPA is 40 months old, requires updated statement', time: '4h ago', type: 'warning' },
    { icon: '📎', text: 'BR-5: Frequency override active for Clark Construction — Semi-Annual (approved by John Webster)', time: '1d ago', type: 'info' }
];

function toggleNotifications() {
    const dd = document.getElementById('notification-dropdown');
    if (dd.style.display === 'none') {
        const list = document.getElementById('notif-list');
        list.innerHTML = notifications.map((n, i) => `
            <div class="notif-item ${n.type}" onclick="handleNotifClick(${i})">
                <span class="notif-icon">${n.icon}</span>
                <div class="notif-content">
                    <div class="notif-text">${n.text}</div>
                    <div class="notif-time">${n.time}</div>
                </div>
            </div>`).join('');
        dd.style.display = 'block';
    } else {
        dd.style.display = 'none';
    }
}

function handleNotifClick(idx) {
    document.getElementById('notification-dropdown').style.display = 'none';
    const n = notifications[idx];
    if (n.text.includes('ARR') || n.text.includes('Account Review')) navigateTo('account-review');
    else if (n.text.includes('bond request') || n.text.includes('BR-')) navigateTo('bond-requests');
    else if (n.text.includes('LOA')) navigateTo('bid-log');
    else if (n.text.includes('Financial') || n.text.includes('FS-')) navigateTo('financial-statements');
    else if (n.text.includes('Claim') || n.text.includes('CLM-')) navigateTo('claims');
    else if (n.text.includes('WIP')) navigateTo('wip');
}

function clearNotifications() {
    notifications.length = 0;
    document.getElementById('notif-list').innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:13px;">No notifications</div>';
    document.getElementById('notif-badge').style.display = 'none';
}

// ==================== GLOBAL SEARCH ====================

function handleGlobalSearch(query) {
    const dd = document.getElementById('search-results');
    if (!query || query.length < 2) { dd.style.display = 'none'; return; }
    const q = query.toLowerCase();
    const results = [];

    sampleBonds.forEach((b, i) => {
        if (b.bondNumber.toLowerCase().includes(q) || b.principal.toLowerCase().includes(q))
            results.push({ label: b.bondNumber + ' — ' + b.principal, action: `navigateTo('bonds'); setTimeout(()=>openBondDetail(${i}),100);` });
    });
    sampleClaims.forEach((c, i) => {
        if (c.claimNumber.toLowerCase().includes(q) || c.principal.toLowerCase().includes(q) || c.claimant.toLowerCase().includes(q))
            results.push({ label: c.claimNumber + ' — ' + c.claimant, action: `navigateTo('claims'); setTimeout(()=>openClaimDetail(${i}),100);` });
    });
    sampleBondRequests.forEach(r => {
        if (r.id.toLowerCase().includes(q) || r.account.toLowerCase().includes(q))
            results.push({ label: r.id + ' — ' + r.account, action: `navigateTo('bond-requests')` });
    });
    sampleAccountReviews.forEach(a => {
        if (a.reviewDate.toLowerCase().includes(q) || a.reviewedBy.toLowerCase().includes(q))
            results.push({ label: 'Review ' + a.reviewDate + ' — ' + a.reviewedBy, action: `navigateTo('account-review')` });
    });

    const viewMap = [
        { keywords: ['home', 'dashboard', 'underwriting'], view: 'underwriting-home', label: 'My Dashboard' },
        { keywords: ['financial', 'statement', 'fs'], view: 'financial-statements', label: 'Financial Statements' },
        { keywords: ['wip', 'work in progress'], view: 'wip', label: 'Work in Progress' },
        { keywords: ['account', 'review', 'arr'], view: 'account-review', label: 'Account Review' },
        { keywords: ['bond', 'bonds', 'show bonds'], view: 'bonds', label: 'Show Bonds' },
        { keywords: ['bid', 'bid log'], view: 'bid-log', label: 'Bid Log' },
        { keywords: ['request', 'bond request'], view: 'bond-requests', label: 'Bond Requests' },
        { keywords: ['claim', 'claims'], view: 'claims', label: 'Show Claims' },
        { keywords: ['report', 'reports'], view: 'reports', label: 'Reports' },
        { keywords: ['exposure', 'map', 'geography'], view: 'exposure', label: 'Exposure Map' },
        { keywords: ['message', 'messages', 'chat', 'conversation'], view: 'messages', label: 'Messages' },
        { keywords: ['note', 'notes', 'account note', 'account notes'], view: 'account-notes', label: 'Account Notes' },
        { keywords: ['loa', 'letter of authority', 'letters of authority'], view: 'loa', label: 'Letters of Authority' }
    ];
    viewMap.forEach(v => {
        if (v.keywords.some(k => k.includes(q)))
            results.push({ label: '🔍 ' + v.label, action: `navigateTo('${v.view}')` });
    });

    if (results.length === 0) {
        dd.innerHTML = '<div class="search-result-item" style="color:var(--text-muted);">No results found</div>';
    } else {
        dd.innerHTML = results.slice(0, 8).map(r => `<div class="search-result-item" onmousedown="${r.action}; document.getElementById('search-results').style.display='none'; document.getElementById('global-search').value='';">${r.label}</div>`).join('');
    }
    dd.style.display = 'block';
}

// ==================== NOTES MODALS ====================

function openARNotes(idx) {
    const r = sampleAccountReviews[idx];
    const body = `
        <div style="margin-bottom:16px;">
            <div class="detail-grid" style="margin-bottom:16px;">
                <div class="detail-item"><div class="detail-label">Review Date</div><div class="detail-value">${r.reviewDate}</div></div>
                <div class="detail-item"><div class="detail-label">Reviewed By</div><div class="detail-value">${r.reviewedBy}</div></div>
            </div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Notes</label>
            <textarea class="modal-input" rows="5" placeholder="Enter review notes...">${r.notes || 'Annual review completed. All financials reviewed and approved. No concerns noted.'}</textarea>
        </div>`;
    const footer = `<button class="btn btn-primary" onclick="showToast('Notes saved'); closeAllModals();">Save</button><button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('Review Notes — ' + r.reviewDate, body, footer);
}

function openFSNotes(fsId) {
    const fs = sampleFinancials.find(f => f.id === fsId);
    const body = `
        <div style="margin-bottom:16px;">
            <div class="detail-grid" style="margin-bottom:16px;">
                <div class="detail-item"><div class="detail-label">Statement</div><div class="detail-value">${fs.id}</div></div>
                <div class="detail-item"><div class="detail-label">Date</div><div class="detail-value">${fs.date}</div></div>
            </div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Notes</label>
            <textarea class="modal-input" rows="5" placeholder="Enter statement notes...">Financial statement reviewed. ${fs.auditStatus}. Prepared by ${fs.preparer}.</textarea>
        </div>`;
    const footer = `<button class="btn btn-primary" onclick="showToast('Notes saved'); closeAllModals();">Save</button><button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('Statement Notes — ' + fs.id, body, footer);
}

function openWIPNotes(idx) {
    const w = sampleWIPSchedules[idx];
    const body = `
        <div style="margin-bottom:16px;">
            <div class="detail-grid" style="margin-bottom:16px;">
                <div class="detail-item"><div class="detail-label">Schedule Date</div><div class="detail-value">${w.date}</div></div>
                <div class="detail-item"><div class="detail-label">Gross Profit</div><div class="detail-value">${fmt(w.grossProfit)}</div></div>
            </div>
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Notes</label>
            <textarea class="modal-input" rows="5" placeholder="Enter WIP schedule notes...">WIP schedule reviewed. Contract price: ${fmt(w.contractPrice)}. Last updated: ${w.lastUpdated}.</textarea>
        </div>`;
    const footer = `<button class="btn btn-primary" onclick="showToast('Notes saved'); closeAllModals();">Save</button><button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('WIP Notes — ' + w.date, body, footer);
}

// ==================== ADDITIONAL DELETE HELPERS ====================

function deleteFinancial(fsId) {
    const idx = sampleFinancials.findIndex(f => f.id === fsId);
    if (idx > -1) sampleFinancials.splice(idx, 1);
    renderFinancials();
    closeAllModals();
}

function deleteWIP(idx) {
    sampleWIPSchedules.splice(idx, 1);
    renderWIPSummary();
    closeAllModals();
}

// ==================== MESSAGES / CHAT ====================

function updateMessageBadge() {
    const total = sampleConversations.reduce((sum, c) => sum + (c.unread || 0), 0);
    const badge = document.getElementById('msg-badge');
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'inline-flex' : 'none';
    }
}

function renderConversationList(filter) {
    const container = document.getElementById('conversation-list');
    const q = (filter || '').toLowerCase();
    const filtered = sampleConversations.filter(c => !q || c.with.toLowerCase().includes(q));
    container.innerHTML = filtered.map((conv, i) => {
        const realIdx = sampleConversations.indexOf(conv);
        const user = sampleUsers.find(u => u.name === conv.with);
        const lastMsg = conv.messages[conv.messages.length - 1];
        const isActive = activeConversationIdx === realIdx;
        return `<div class="conversation-item ${isActive ? 'active' : ''}" onclick="openConversation(${realIdx})">
            <div class="conv-avatar">${user ? user.avatar : '??'}</div>
            <div class="conv-info">
                <div class="conv-name">${conv.with}${conv.unread > 0 ? `<span class="conv-unread">${conv.unread}</span>` : ''}</div>
                <div class="conv-preview">${lastMsg.text.substring(0, 50)}${lastMsg.text.length > 50 ? '...' : ''}</div>
            </div>
            <div class="conv-time">${lastMsg.time.split(', 2024 ')[1] || lastMsg.time.split(' ').slice(-2).join(' ')}</div>
        </div>`;
    }).join('');
    updateMessageBadge();
}

function filterConversations(val) { renderConversationList(val); }

function openConversation(idx) {
    activeConversationIdx = idx;
    const conv = sampleConversations[idx];
    conv.unread = 0;
    const user = sampleUsers.find(u => u.name === conv.with);

    document.getElementById('chat-placeholder').style.display = 'none';
    document.getElementById('chat-active').style.display = 'flex';

    document.getElementById('chat-header').innerHTML = `
        <div class="conv-avatar">${user ? user.avatar : '??'}</div>
        <div><strong>${conv.with}</strong><div style="font-size:11px; color:var(--text-muted);">${user ? user.role : ''}</div></div>`;

    renderMessages(conv);
    renderConversationList();
}

function renderMessages(conv) {
    const container = document.getElementById('chat-messages');
    container.innerHTML = conv.messages.map(m => {
        const isMine = m.from === currentUser.name;
        return `<div class="chat-bubble ${isMine ? 'sent' : 'received'}">
            <div class="bubble-text">${m.text}</div>
            <div class="bubble-meta">${m.from.split(' ')[0]} &bull; ${m.time}</div>
        </div>`;
    }).join('');
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || activeConversationIdx === null) return;

    const conv = sampleConversations[activeConversationIdx];
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' +
                    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    conv.messages.push({ from: currentUser.name, text: text, time: timeStr });
    input.value = '';
    renderMessages(conv);
    renderConversationList();
}

function openNewMessageModal() {
    const userOptions = sampleUsers.map(u =>
        `<div class="new-msg-recipient" onclick="startNewConversation('${u.name}')">
            <div class="conv-avatar">${u.avatar}</div>
            <div><strong>${u.name}</strong><div style="font-size:11px; color:var(--text-muted);">${u.role}</div></div>
        </div>`
    ).join('');
    const body = `<div style="margin-bottom:12px;"><label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:8px;">Select recipient:</label>${userOptions}</div>`;
    const footer = `<button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('New Message', body, footer);
}

function startNewConversation(userName) {
    let idx = sampleConversations.findIndex(c => c.with === userName);
    if (idx === -1) {
        sampleConversations.push({ with: userName, unread: 0, messages: [] });
        idx = sampleConversations.length - 1;
    }
    closeAllModals();
    openConversation(idx);
}

// ==================== ACCOUNT NOTES ====================

function renderAccountNotesList(filter) {
    const container = document.getElementById('account-notes-list');
    const q = (filter || '').toLowerCase();
    const accounts = Object.keys(sampleAccountNotes).filter(a => !q || a.toLowerCase().includes(q));
    container.innerHTML = accounts.map(acct => {
        const notes = sampleAccountNotes[acct];
        const pinnedCount = notes.filter(n => n.pinned).length;
        const isActive = activeAccountNote === acct;
        return `<div class="conversation-item ${isActive ? 'active' : ''}" onclick="openAccountNotesDetail('${acct.replace(/'/g, "\\'")}')">
            <div class="conv-avatar" style="background:var(--accent-purple);">${acct.split(' ').map(w => w[0]).join('').substring(0, 2)}</div>
            <div class="conv-info">
                <div class="conv-name">${acct}</div>
                <div class="conv-preview">${notes.length} note${notes.length !== 1 ? 's' : ''}${pinnedCount > 0 ? ' &bull; ' + pinnedCount + ' pinned' : ''}</div>
            </div>
        </div>`;
    }).join('');
}

function filterAccountNotesList(val) { renderAccountNotesList(val); }

function openAccountNotesDetail(acctName) {
    activeAccountNote = acctName;
    document.getElementById('notes-placeholder').style.display = 'none';
    document.getElementById('account-notes-detail').style.display = 'flex';

    document.getElementById('notes-detail-header').innerHTML = `
        <div class="conv-avatar" style="background:var(--accent-purple); width:36px; height:36px; font-size:13px;">${acctName.split(' ').map(w => w[0]).join('').substring(0, 2)}</div>
        <div><strong>${acctName}</strong><div style="font-size:11px; color:var(--text-muted);">${(sampleAccountNotes[acctName] || []).length} notes</div></div>`;

    renderNotesFeed(acctName);
    renderAccountNotesList();
}

function renderNotesFeed(acctName) {
    const container = document.getElementById('notes-feed');
    const notes = sampleAccountNotes[acctName] || [];
    const sorted = [...notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    container.innerHTML = sorted.map((n, i) => {
        const realIdx = notes.indexOf(n);
        return `<div class="note-card ${n.pinned ? 'pinned' : ''}">
            <div class="note-header">
                <span class="note-author">${n.author}</span>
                <span class="note-date">${n.date}</span>
            </div>
            <div class="note-text">${n.text}</div>
            <div class="note-actions">
                <button class="btn-icon" onclick="togglePinNote('${acctName.replace(/'/g, "\\'")}', ${realIdx})" title="${n.pinned ? 'Unpin' : 'Pin'}">
                    <svg viewBox="0 0 24 24" fill="${n.pinned ? 'var(--accent-blue)' : 'none'}" stroke="currentColor" stroke-width="2" style="width:14px; height:14px;"><path d="M12 2L12 22M12 2L8 6M12 2L16 6"/></svg>
                    ${n.pinned ? 'Pinned' : 'Pin'}
                </button>
                <button class="btn-icon" onclick="deleteNote('${acctName.replace(/'/g, "\\'")}', ${realIdx})" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px; height:14px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    Delete
                </button>
            </div>
        </div>`;
    }).join('');
}

function togglePinNote(acctName, idx) {
    sampleAccountNotes[acctName][idx].pinned = !sampleAccountNotes[acctName][idx].pinned;
    renderNotesFeed(acctName);
}

function deleteNote(acctName, idx) {
    sampleAccountNotes[acctName].splice(idx, 1);
    renderNotesFeed(acctName);
    renderAccountNotesList();
    showToast('Note deleted');
}

function addAccountNote() {
    const input = document.getElementById('note-input');
    const text = input.value.trim();
    if (!text || !activeAccountNote) return;

    if (!sampleAccountNotes[activeAccountNote]) sampleAccountNotes[activeAccountNote] = [];
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' +
                    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    sampleAccountNotes[activeAccountNote].unshift({ author: currentUser.name, date: dateStr, text: text, pinned: false });
    input.value = '';
    renderNotesFeed(activeAccountNote);
    renderAccountNotesList();
    showToast('Note added');
}

function openAddAccountNoteModal() {
    const accounts = [...new Set([
        ...sampleARRs.map(a => a.account),
        ...Object.keys(sampleAccountNotes)
    ])].sort();
    const options = accounts.map(a => `<option value="${a}">${a}</option>`).join('');
    const body = `
        <div style="margin-bottom:16px;">
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Account</label>
            <select class="form-input" id="new-note-account">${options}</select>
        </div>
        <div style="margin-bottom:16px;">
            <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Note</label>
            <textarea class="modal-input" id="new-note-text" rows="4" placeholder="Enter note..."></textarea>
        </div>`;
    const footer = `<button class="btn btn-primary" onclick="submitAccountNoteFromModal()">Add Note</button><button class="btn btn-outline" onclick="closeAllModals()">Cancel</button>`;
    openModal('Add Account Note', body, footer);
}

function submitAccountNoteFromModal() {
    const acct = document.getElementById('new-note-account').value;
    const text = document.getElementById('new-note-text').value.trim();
    if (!text) { showToast('Please enter a note'); return; }
    if (!sampleAccountNotes[acct]) sampleAccountNotes[acct] = [];
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' +
                    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    sampleAccountNotes[acct].unshift({ author: currentUser.name, date: dateStr, text: text, pinned: false });
    closeAllModals();
    openAccountNotesDetail(acct);
    renderAccountNotesList();
    showToast('Note added to ' + acct);
}

// ==================== TOAST NOTIFICATION ====================

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// ==================== PREMIUM AR BY AGENCY ====================

function renderPremiumAR() {
    const data = samplePremiumAR;
    const totalInvoices = data.reduce((s, r) => s + r.invoices, 0);
    const totCurrent = data.reduce((s, r) => s + r.current, 0);
    const tot1_30 = data.reduce((s, r) => s + r.d1_30, 0);
    const tot31_60 = data.reduce((s, r) => s + r.d31_60, 0);
    const tot61_90 = data.reduce((s, r) => s + r.d61_90, 0);
    const tot90plus = data.reduce((s, r) => s + r.d90plus, 0);
    const totalAR = totCurrent + tot1_30 + tot31_60 + tot61_90 + tot90plus;

    const fmt = v => '$' + v.toLocaleString();

    // As-of line
    const today = new Date();
    const asof = document.getElementById('premium-ar-asof');
    if (asof) asof.textContent = `As of ${today.toISOString().slice(0,10)} \u00B7 ${totalInvoices} open invoices`;

    // 6 KPI cards
    const kpiStyle = 'border-left:3px solid var(--accent-brand);cursor:pointer;transition:transform 0.15s ease, box-shadow 0.15s ease;';
    const kpiHover = '" onmouseenter="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(0,0,0,0.1)\'" onmouseleave="this.style.transform=\'none\';this.style.boxShadow=\'none\'';
    document.getElementById('premium-ar-kpis').innerHTML = `
        <div class="kpi-card" style="${kpiStyle}" onclick="openKPIDrillDown('total')"${kpiHover}"><div class="kpi-label" style="text-transform:uppercase;font-size:10px;letter-spacing:0.5px;margin-bottom:8px;">Total Outstanding</div><div class="kpi-value" style="font-size:22px;">${fmt(totalAR)}</div></div>
        <div class="kpi-card" style="${kpiStyle}" onclick="openKPIDrillDown('current')"${kpiHover}"><div class="kpi-label" style="text-transform:uppercase;font-size:10px;letter-spacing:0.5px;margin-bottom:8px;">Current</div><div class="kpi-value" style="font-size:22px;">${fmt(totCurrent)}</div></div>
        <div class="kpi-card" style="${kpiStyle}" onclick="openKPIDrillDown('d1_30')"${kpiHover}"><div class="kpi-label" style="text-transform:uppercase;font-size:10px;letter-spacing:0.5px;margin-bottom:8px;">1\u201330 Days</div><div class="kpi-value" style="font-size:22px;">${fmt(tot1_30)}</div></div>
        <div class="kpi-card" style="${kpiStyle}" onclick="openKPIDrillDown('d31_60')"${kpiHover}"><div class="kpi-label" style="text-transform:uppercase;font-size:10px;letter-spacing:0.5px;margin-bottom:8px;">31\u201360 Days</div><div class="kpi-value" style="font-size:22px;">${fmt(tot31_60)}</div></div>
        <div class="kpi-card" style="${kpiStyle}" onclick="openKPIDrillDown('d61_90')"${kpiHover}"><div class="kpi-label" style="text-transform:uppercase;font-size:10px;letter-spacing:0.5px;margin-bottom:2px;">Potential SON</div><div style="font-size:9px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.3px;margin-bottom:8px;">61\u201390 Days</div><div class="kpi-value" style="font-size:22px;">${fmt(tot61_90)}</div></div>
        <div class="kpi-card" style="${kpiStyle}" onclick="openKPIDrillDown('d90plus')"${kpiHover}"><div class="kpi-label" style="text-transform:uppercase;font-size:10px;letter-spacing:0.5px;margin-bottom:2px;">SON</div><div style="font-size:9px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.3px;margin-bottom:8px;">90+ Days</div><div class="kpi-value" style="font-size:22px;">${fmt(tot90plus)}</div></div>
    `;

    // Column definitions
    const cols = [
        { label: 'Agency', key: 'agency', type: 'string' },
        { label: 'Current', key: 'current', type: 'number' },
        { label: '1\u201330', key: 'd1_30', type: 'number' },
        { label: '31\u201360', key: 'd31_60', type: 'number' },
        { label: 'Potential SON', subtitle: '61\u201390', key: 'd61_90', type: 'number' },
        { label: 'SON', subtitle: '90+', key: 'd90plus', type: 'number' },
        { label: 'Total', key: 'total', type: 'number' },
        { label: 'Invoices', key: 'invoices', type: 'number' }
    ];

    // Add computed total to each row
    window._premiumARData = data.map(r => ({ ...r, total: r.current + r.d1_30 + r.d31_60 + r.d61_90 + r.d90plus }));
    window._premiumARData.sort((a, b) => b.total - a.total);
    window._premiumARCols = cols;

    renderPremiumARRows();
}

function renderPremiumARRows() {
    const cols = window._premiumARCols;
    let rows = [...window._premiumARData];
    const sort = getTableSort('premium-ar-agency-table');
    if (sort && sort.col !== '' && cols[sort.col]) {
        const col = cols[sort.col];
        rows.sort((a, b) => {
            let va = a[col.key], vb = b[col.key];
            if (col.type === 'number') return sort.asc ? va - vb : vb - va;
            return sort.asc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
        });
    }

    // Header — light/white style with uppercase gray labels (not blue branded)
    const headerRow = document.getElementById('premium-ar-agency-header');
    const thBase = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';
    headerRow.innerHTML = cols.map((c, i) => {
        const arrow = sortArrow('premium-ar-agency-table', i);
        const align = c.type === 'number' ? 'text-align:right;' : '';
        const labelHtml = c.subtitle
            ? `<div>${c.label}</div><div style="font-size:8px;font-weight:400;color:#9ca3af;margin-top:1px;">${c.subtitle}</div>`
            : c.label;
        return `<th class="sortable" style="${thBase}${align}" onclick="toggleTableSort('premium-ar-agency-table',${i},renderPremiumARRows)">${labelHtml}${arrow}</th>`;
    }).join('');

    // Rows — inline expandable with account/bond sub-rows
    const fmtCell = v => v === 0 ? '<span style="color:var(--text-muted);">\u2014</span>' : '$' + v.toLocaleString();
    const tdRight = 'text-align:right;padding:10px 12px;';
    const tdLeft = 'padding:10px 12px;';
    const body = document.getElementById('premium-ar-agency-body');
    let html = '';

    rows.forEach((r, idx) => {
        const agGrp = 'par-ag-' + idx;

        // Agency summary row (click to expand/collapse)
        html += `<tr style="cursor:pointer;background:#fff;" onclick="togglePARGroup('${agGrp}','${agGrp}-arrow')">
            <td style="${tdLeft}">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span id="${agGrp}-arrow" style="font-size:9px;color:var(--text-muted);width:12px;">\u25B6</span>
                    <div><div style="font-weight:600;">${r.agency}</div><div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.3px;margin-top:2px;">${r.type}</div></div>
                </div>
            </td>
            <td style="${tdRight}">${fmtCell(r.current)}</td>
            <td style="${tdRight}">${fmtCell(r.d1_30)}</td>
            <td style="${tdRight}">${fmtCell(r.d31_60)}</td>
            <td style="${tdRight}">${fmtCell(r.d61_90)}</td>
            <td style="${tdRight}">${fmtCell(r.d90plus)}</td>
            <td style="${tdRight}font-weight:700;">${'$' + r.total.toLocaleString()}</td>
            <td style="${tdRight}">${r.invoices}</td>
        </tr>`;

        // Inline detail: account rows + bond sub-rows (hidden by default via display:none on each <tr>)
        const accounts = samplePremiumARDetail[r.agency] || [];
        const acctTotals = { current: 0, d1_30: 0, d31_60: 0, d61_90: 0, d90plus: 0, invoices: 0 };

        accounts.forEach((a, aIdx) => {
            const aTotal = a.current + a.d1_30 + a.d31_60 + a.d61_90 + a.d90plus;
            acctTotals.current += a.current;
            acctTotals.d1_30 += a.d1_30;
            acctTotals.d31_60 += a.d31_60;
            acctTotals.d61_90 += a.d61_90;
            acctTotals.d90plus += a.d90plus;
            acctTotals.invoices += a.invoices;
            const bonds = samplePremiumARBonds[r.agency + '|' + a.account] || [];
            const hasBonds = bonds.length > 0;
            const bondGrp = 'par-bd-' + idx + '-' + aIdx;

            if (hasBonds) {
                // Account row with expand arrow for bonds
                html += `<tr data-parent="${agGrp}" style="display:none;cursor:pointer;background:#f9fafb;" onclick="event.stopPropagation();togglePARBonds('${bondGrp}','${bondGrp}-arrow')">
                    <td style="padding:8px 12px 8px 44px;">
                        <div style="display:flex;align-items:center;gap:6px;">
                            <span id="${bondGrp}-arrow" style="font-size:8px;color:var(--text-muted);width:10px;">\u25B6</span>
                            <div>${accountLink(a.account)}<div style="font-size:10px;color:var(--text-muted);margin-top:1px;">${bonds.length} bond${bonds.length !== 1 ? 's' : ''}</div></div>
                        </div>
                    </td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.current)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d1_30)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d31_60)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d61_90)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d90plus)}</td>
                    <td style="${tdRight}font-size:12px;font-weight:700;">${'$' + aTotal.toLocaleString()}</td>
                    <td style="${tdRight}font-size:12px;">${a.invoices}</td>
                </tr>`;

                // Bond sub-rows (hidden by default)
                bonds.forEach(b => {
                    const bTotal = b.current + b.d1_30 + b.d31_60 + b.d61_90 + b.d90plus;
                    const bIdx = sampleBonds.findIndex(sb => sb.bondNumber === b.bondNumber);
                    const bondLabel = bIdx >= 0
                        ? `<span class="clickable-cell" onclick="event.stopPropagation();navigateToBond('${b.bondNumber}')">${b.bondNumber}</span>`
                        : `<span>${b.bondNumber}</span>`;
                    html += `<tr data-parent="${bondGrp}" style="display:none;background:#f3f4f6;">
                        <td style="padding:6px 12px 6px 72px;">
                            <div style="font-size:11px;font-weight:500;color:var(--text-primary);">${bondLabel}</div>
                            <div style="font-size:10px;color:var(--text-muted);margin-top:1px;">${b.bondType} \u00B7 ${b.project}</div>
                        </td>
                        <td style="${tdRight}font-size:11px;">${fmtCell(b.current)}</td>
                        <td style="${tdRight}font-size:11px;">${fmtCell(b.d1_30)}</td>
                        <td style="${tdRight}font-size:11px;">${fmtCell(b.d31_60)}</td>
                        <td style="${tdRight}font-size:11px;">${fmtCell(b.d61_90)}</td>
                        <td style="${tdRight}font-size:11px;">${fmtCell(b.d90plus)}</td>
                        <td style="${tdRight}font-size:11px;font-weight:600;">${'$' + bTotal.toLocaleString()}</td>
                        <td style="${tdRight}font-size:11px;"></td>
                    </tr>`;
                });
            } else {
                // Account row without bonds
                html += `<tr data-parent="${agGrp}" style="display:none;background:#f9fafb;">
                    <td style="padding:8px 12px 8px 44px;">${accountLink(a.account)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.current)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d1_30)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d31_60)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d61_90)}</td>
                    <td style="${tdRight}font-size:12px;">${fmtCell(a.d90plus)}</td>
                    <td style="${tdRight}font-size:12px;font-weight:700;">${'$' + aTotal.toLocaleString()}</td>
                    <td style="${tdRight}font-size:12px;">${a.invoices}</td>
                </tr>`;
            }
        });

        // Agency subtotal footer
        const acctGrandTotal = acctTotals.current + acctTotals.d1_30 + acctTotals.d31_60 + acctTotals.d61_90 + acctTotals.d90plus;
        html += `<tr data-parent="${agGrp}" style="display:none;background:#eef2ff;font-weight:600;border-top:1px solid #e5e7eb;">
            <td style="padding:8px 12px 8px 44px;font-size:12px;color:var(--text-secondary);">Total (${accounts.length} accounts)</td>
            <td style="${tdRight}font-size:12px;">${fmtCell(acctTotals.current)}</td>
            <td style="${tdRight}font-size:12px;">${fmtCell(acctTotals.d1_30)}</td>
            <td style="${tdRight}font-size:12px;">${fmtCell(acctTotals.d31_60)}</td>
            <td style="${tdRight}font-size:12px;">${fmtCell(acctTotals.d61_90)}</td>
            <td style="${tdRight}font-size:12px;">${fmtCell(acctTotals.d90plus)}</td>
            <td style="${tdRight}font-size:12px;font-weight:700;">$${acctGrandTotal.toLocaleString()}</td>
            <td style="${tdRight}font-size:12px;">${acctTotals.invoices}</td>
        </tr>`;
    });

    body.innerHTML = html;
}

// Toggle visibility of agency detail rows (accounts + footer)
function togglePARGroup(groupId, arrowId) {
    var rows = document.querySelectorAll('tr[data-parent="' + groupId + '"]');
    var arrow = document.getElementById(arrowId);
    var isHidden = rows.length > 0 && rows[0].style.display === 'none';
    if (isHidden) {
        // Show account rows and footer
        rows.forEach(function(r) { r.style.display = ''; });
        if (arrow) arrow.textContent = '\u25BC';
    } else {
        // Hide account rows, footer, and any expanded bond rows beneath them
        rows.forEach(function(r) { r.style.display = 'none'; });
        if (arrow) arrow.textContent = '\u25B6';
        // Also collapse any open bond groups and reset their arrows
        rows.forEach(function(r) {
            var bondArrow = r.querySelector('[id$="-arrow"]');
            if (bondArrow && bondArrow.textContent === '\u25BC') {
                bondArrow.textContent = '\u25B6';
            }
        });
        // Hide all bond sub-rows that belong to accounts under this agency
        document.querySelectorAll('tr[data-parent^="par-bd-' + groupId.replace('par-ag-','') + '-"]').forEach(function(r) {
            r.style.display = 'none';
        });
    }
}

// Toggle visibility of bond sub-rows under an account
function togglePARBonds(bondGroupId, arrowId) {
    var rows = document.querySelectorAll('tr[data-parent="' + bondGroupId + '"]');
    var arrow = document.getElementById(arrowId);
    var isHidden = rows.length > 0 && rows[0].style.display === 'none';
    rows.forEach(function(r) { r.style.display = isHidden ? '' : 'none'; });
    if (arrow) arrow.textContent = isHidden ? '\u25BC' : '\u25B6';
}

// ==================== KPI DRILL-DOWN ====================

function openKPIDrillDown(bucket) {
    const bucketLabels = {
        total: 'Total Outstanding',
        current: 'Current',
        d1_30: '1\u201330 Days',
        d31_60: '31\u201360 Days',
        d61_90: 'Potential SON (61\u201390 Days)',
        d90plus: 'SON (90+ Days)'
    };
    const label = bucketLabels[bucket] || bucket;
    const fmtCell = v => v === 0 ? '<span style="color:var(--text-muted);">\u2014</span>' : '$' + v.toLocaleString();

    // Build agency-level rows with account sub-rows
    const agencyRows = samplePremiumAR.map(ag => {
        const agVal = bucket === 'total'
            ? (ag.current + ag.d1_30 + ag.d31_60 + ag.d61_90 + ag.d90plus)
            : ag[bucket];
        const accounts = samplePremiumARDetail[ag.agency] || [];
        return { agency: ag.agency, type: ag.type, value: agVal, accounts };
    }).filter(r => r.value > 0).sort((a, b) => b.value - a.value);

    const grandTotal = agencyRows.reduce((s, r) => s + r.value, 0);

    const thStyle = 'background:#f8f9fa;color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 12px;border-bottom:1px solid #e5e7eb;';

    let tableRows = '';
    agencyRows.forEach((ag, idx) => {
        const pct = grandTotal > 0 ? ((ag.value / grandTotal) * 100).toFixed(1) : '0.0';
        const barWidth = grandTotal > 0 ? Math.max(2, (ag.value / grandTotal) * 100) : 0;
        const toggleId = 'kpi-drill-agency-' + idx;

        // Agency row
        tableRows += `<tr style="cursor:pointer;background:#fff;" onclick="(function(){var el=document.getElementById('${toggleId}');el.style.display=el.style.display==='none'?'table-row-group':'none';var arrow=document.getElementById('${toggleId}-arrow');arrow.textContent=el.style.display==='none'?'\u25B6':'\u25BC';})()">
            <td style="padding:10px 12px;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span id="${toggleId}-arrow" style="font-size:9px;color:var(--text-muted);width:12px;">\u25B6</span>
                    <div>
                        <div style="font-weight:600;">${ag.agency}</div>
                        <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.3px;margin-top:2px;">${ag.type} \u00B7 ${ag.accounts.length} accounts</div>
                    </div>
                </div>
            </td>
            <td style="text-align:right;padding:10px 12px;font-weight:600;">${'$' + ag.value.toLocaleString()}</td>
            <td style="text-align:right;padding:10px 12px;">${pct}%</td>
            <td style="padding:10px 12px;width:120px;">
                <div style="background:#fee2e2;border-radius:4px;height:8px;width:100%;"><div style="background:var(--accent-brand);border-radius:4px;height:8px;width:${barWidth}%;"></div></div>
            </td>
        </tr>`;

        // Account sub-rows (hidden by default)
        tableRows += `<tbody id="${toggleId}" style="display:none;">`;
        ag.accounts.forEach((acct, acctIdx) => {
            const acctVal = bucket === 'total'
                ? (acct.current + acct.d1_30 + acct.d31_60 + acct.d61_90 + acct.d90plus)
                : acct[bucket];
            if (acctVal > 0) {
                const acctPct = grandTotal > 0 ? ((acctVal / grandTotal) * 100).toFixed(1) : '0.0';
                const acctBar = grandTotal > 0 ? Math.max(1, (acctVal / grandTotal) * 100) : 0;
                const bonds = samplePremiumARBonds[ag.agency + '|' + acct.account] || [];
                const bondsWithVal = bonds.filter(b => {
                    const bVal = bucket === 'total' ? (b.current + b.d1_30 + b.d31_60 + b.d61_90 + b.d90plus) : b[bucket];
                    return bVal > 0;
                });
                const hasBonds = bondsWithVal.length > 0;
                const bondToggleId = 'kpi-drill-bond-' + idx + '-' + acctIdx;

                if (hasBonds) {
                    tableRows += `<tr style="background:#f9fafb;cursor:pointer;" onclick="(function(){var el=document.getElementById('${bondToggleId}');el.style.display=el.style.display==='none'?'table-row-group':'none';var arrow=document.getElementById('${bondToggleId}-arrow');arrow.textContent=el.style.display==='none'?'\\u25B6':'\\u25BC';})()">
                        <td style="padding:8px 12px 8px 44px;font-size:12px;">
                            <div style="display:flex;align-items:center;gap:6px;">
                                <span id="${bondToggleId}-arrow" style="font-size:8px;color:var(--text-muted);width:10px;">\u25B6</span>
                                <div>${accountLink(acct.account)}<div style="font-size:10px;color:var(--text-muted);margin-top:1px;">${bondsWithVal.length} bond${bondsWithVal.length !== 1 ? 's' : ''}</div></div>
                            </div>
                        </td>
                        <td style="text-align:right;padding:8px 12px;font-size:12px;">${'$' + acctVal.toLocaleString()}</td>
                        <td style="text-align:right;padding:8px 12px;font-size:12px;color:var(--text-muted);">${acctPct}%</td>
                        <td style="padding:8px 12px;width:120px;">
                            <div style="background:#fee2e2;border-radius:4px;height:6px;width:100%;"><div style="background:#f87171;border-radius:4px;height:6px;width:${acctBar}%;"></div></div>
                        </td>
                    </tr>`;
                    // Bond sub-rows (hidden)
                    tableRows += `<tbody id="${bondToggleId}" style="display:none;">`;
                    bondsWithVal.forEach(b => {
                        const bVal = bucket === 'total' ? (b.current + b.d1_30 + b.d31_60 + b.d61_90 + b.d90plus) : b[bucket];
                        const bPct = grandTotal > 0 ? ((bVal / grandTotal) * 100).toFixed(1) : '0.0';
                        const bIdx = sampleBonds.findIndex(sb => sb.bondNumber === b.bondNumber);
                        const bondLabel = bIdx >= 0
                            ? `<span class="clickable-cell" onclick="event.stopPropagation();navigateToBond('${b.bondNumber}')">${b.bondNumber}</span>`
                            : `<span>${b.bondNumber}</span>`;
                        tableRows += `<tr style="background:#f3f4f6;">
                            <td style="padding:6px 12px 6px 72px;">
                                <div style="font-size:11px;font-weight:500;color:var(--text-primary);">${bondLabel}</div>
                                <div style="font-size:10px;color:var(--text-muted);margin-top:1px;">${b.bondType} \u00B7 ${b.project}</div>
                            </td>
                            <td style="text-align:right;padding:6px 12px;font-size:11px;">${'$' + bVal.toLocaleString()}</td>
                            <td style="text-align:right;padding:6px 12px;font-size:11px;color:var(--text-muted);">${bPct}%</td>
                            <td style="padding:6px 12px;"></td>
                        </tr>`;
                    });
                    tableRows += `</tbody>`;
                } else {
                    tableRows += `<tr style="background:#f9fafb;">
                        <td style="padding:8px 12px 8px 44px;font-size:12px;">${accountLink(acct.account)}</td>
                        <td style="text-align:right;padding:8px 12px;font-size:12px;">${'$' + acctVal.toLocaleString()}</td>
                        <td style="text-align:right;padding:8px 12px;font-size:12px;color:var(--text-muted);">${acctPct}%</td>
                        <td style="padding:8px 12px;width:120px;">
                            <div style="background:#fee2e2;border-radius:4px;height:6px;width:100%;"><div style="background:#f87171;border-radius:4px;height:6px;width:${acctBar}%;"></div></div>
                        </td>
                    </tr>`;
                }
            }
        });
        tableRows += `</tbody>`;
    });

    // Footer total row
    const footerRow = `<tr style="background:#f8f9fa;font-weight:700;border-top:2px solid #e5e7eb;">
        <td style="padding:10px 12px;">Total (${agencyRows.length} agencies)</td>
        <td style="text-align:right;padding:10px 12px;">$${grandTotal.toLocaleString()}</td>
        <td style="text-align:right;padding:10px 12px;">100%</td>
        <td style="padding:10px 12px;"></td>
    </tr>`;

    const body = `
        <div style="margin-bottom:16px;">
            <div style="font-size:13px;color:var(--text-secondary);">${agencyRows.length} agencies with outstanding balances \u00B7 <strong>$${grandTotal.toLocaleString()}</strong> total</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Click an agency to see accounts, then click an account to see bonds</div>
        </div>
        <div style="overflow-x:auto;max-height:520px;overflow-y:auto;">
            <table class="data-table" style="margin:0;">
                <thead><tr>
                    <th style="${thStyle}">Agency</th>
                    <th style="${thStyle}text-align:right;">Amount</th>
                    <th style="${thStyle}text-align:right;">% of Total</th>
                    <th style="${thStyle}">Distribution</th>
                </tr></thead>
                <tbody>${tableRows}${footerRow}</tbody>
            </table>
        </div>`;

    const footer = '<button class="btn btn-outline" onclick="closeAllModals()">Close</button>';
    openModal(label + ' \u2014 Breakdown by Agency', body, footer);
    document.getElementById('modal-container').style.maxWidth = '900px';
}

// ==================== AI HELP ASSISTANT ====================

function toggleAIChat() {
    const panel = document.getElementById('ai-chat-panel');
    const fab = document.getElementById('ai-fab');
    if (!panel) return;
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'flex';
    fab.classList.toggle('active', !isOpen);
    if (!isOpen) {
        const input = document.getElementById('ai-chat-input');
        if (input) input.focus();
    }
}

function sendAISuggestion(chipEl) {
    const text = chipEl.textContent.trim();
    // Remove all suggestion chips from parent
    const suggestionsDiv = chipEl.closest('.ai-suggestions');
    if (suggestionsDiv) suggestionsDiv.remove();
    appendAIUserMessage(text);
    processAIResponse(text);
}

function sendAIMessage() {
    const input = document.getElementById('ai-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    appendAIUserMessage(text);
    processAIResponse(text);
}

function appendAIUserMessage(text) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'ai-msg ai-msg-user';
    div.innerHTML = `<div class="ai-msg-avatar">${currentUser.avatar}</div><div class="ai-msg-content"><p>${escapeHTML(text)}</p></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function appendAIBotMessage(html, suggestions) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;
    // Remove typing indicator if present
    const typing = container.querySelector('.ai-typing-msg');
    if (typing) typing.remove();

    const div = document.createElement('div');
    div.className = 'ai-msg ai-msg-bot';
    let suggestionsHTML = '';
    if (suggestions && suggestions.length) {
        suggestionsHTML = `<div class="ai-suggestions">${suggestions.map(s => `<button class="ai-suggestion-chip" onclick="sendAISuggestion(this)">${s}</button>`).join('')}</div>`;
    }
    div.innerHTML = `<div class="ai-msg-avatar">AI</div><div class="ai-msg-content">${html}${suggestionsHTML}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showAITyping() {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'ai-msg ai-msg-bot ai-typing-msg';
    div.innerHTML = `<div class="ai-msg-avatar">AI</div><div class="ai-msg-content"><div class="ai-typing-indicator"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div></div></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function processAIResponse(userText) {
    showAITyping();
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
        const { html, suggestions } = matchAIResponse(userText);
        appendAIBotMessage(html, suggestions);
    }, delay);
}

function matchAIResponse(text) {
    const t = text.toLowerCase();

    // ARR / Account Review Report
    if (t.includes('submit') && t.includes('arr') || t.includes('account review report') || t.includes('how do i submit')) {
        return {
            html: `<p>To submit an <strong>Account Review Report (ARR)</strong>:</p>
            <ul>
                <li>Navigate to <strong>My Account Review Reports</strong> from the sidebar</li>
                <li>Click <strong>"New ARR"</strong> in the top-right corner</li>
                <li>Fill in the required fields: Account, Risk Assessment, Financial Analysis, and Recommendation</li>
                <li>Click <strong>"Submit for Review"</strong> — it will enter the review queue and route to your Branch Manager</li>
            </ul>
            <p>ARRs follow the chain of command: <strong>Underwriter → Branch Manager → Regional UW Manager → Home Office</strong>.</p>`,
            suggestions: ['What are the review queue statuses?', 'How long do reviews take?']
        };
    }

    // Review queue statuses
    if (t.includes('review queue') || t.includes('queue status') || t.includes('review status')) {
        return {
            html: `<p>ARRs move through these <strong>review queue statuses</strong>:</p>
            <ul>
                <li><strong>Draft</strong> — Saved but not yet submitted</li>
                <li><strong>Submitted</strong> — In the review queue, awaiting first reviewer</li>
                <li><strong>UW Review</strong> — Being reviewed by Underwriting</li>
                <li><strong>Branch Review</strong> — Branch Manager is reviewing</li>
                <li><strong>Regional Review</strong> — Regional UW Manager is reviewing</li>
                <li><strong>Home Office Review</strong> — Final review at Home Office level</li>
                <li><strong>Approved</strong> — Fully approved through the chain</li>
                <li><strong>Returned</strong> — Sent back for revisions with comments</li>
            </ul>`,
            suggestions: ['How do I submit an ARR?', 'What accounts need attention?']
        };
    }

    // Accounts needing attention
    if (t.includes('accounts need attention') || t.includes('accounts at risk') || t.includes('which accounts') || t.includes('red flag')) {
        const suspended = sampleMyAccounts.filter(a => a.status === 'Suspended');
        const highRiskARRs = sampleARRs.filter(a => a.risk === 'high' && a.assignee === currentUser.name);
        let html = `<p>Here's a summary of accounts requiring attention:</p><ul>`;
        if (suspended.length) {
            html += `<li><strong>${suspended.length} Suspended Account${suspended.length > 1 ? 's' : ''}</strong>: ${suspended.map(s => s.name).join(', ')}</li>`;
        }
        if (highRiskARRs.length) {
            html += `<li><strong>${highRiskARRs.length} High-Risk ARR${highRiskARRs.length > 1 ? 's' : ''}</strong>: ${highRiskARRs.map(a => a.account).join(', ')}</li>`;
        }
        const overdueARRs = sampleARRs.filter(a => a.status === 'Overdue' && a.assignee === currentUser.name);
        if (overdueARRs.length) {
            html += `<li><strong>${overdueARRs.length} Overdue ARR${overdueARRs.length > 1 ? 's' : ''}</strong> needing immediate action</li>`;
        }
        html += `</ul><p>Check the <strong>Red Flags</strong> view for a comprehensive risk summary.</p>`;
        return { html, suggestions: ['Show me suspended accounts', 'Explain bond request workflow'] };
    }

    // Suspended accounts
    if (t.includes('suspended')) {
        const suspended = sampleMyAccounts.filter(a => a.status === 'Suspended');
        let html = `<p>You have <strong>${suspended.length} suspended account${suspended.length !== 1 ? 's' : ''}</strong>:</p><ul>`;
        suspended.forEach(a => {
            html += `<li><strong>${a.name}</strong> (Grade ${a.accountGrade}) — ${a.suspendedReason || 'No reason specified'}</li>`;
        });
        html += `</ul><p>Suspended accounts cannot have new bonds issued until the suspension is resolved.</p>`;
        return { html, suggestions: ['What accounts need attention?', 'How do I reactivate an account?'] };
    }

    // Bond request workflow
    if (t.includes('bond request') || t.includes('bond workflow') || t.includes('bond process')) {
        return {
            html: `<p>The <strong>bond request workflow</strong> follows these steps:</p>
            <ul>
                <li><strong>1. Request Submitted</strong> — Agent or contractor submits a bond need</li>
                <li><strong>2. Underwriter Review</strong> — You review the request, financials, and project details</li>
                <li><strong>3. Approval / Decline / Refer</strong> — Approve within authority, decline with reason, or refer to higher authority</li>
                <li><strong>4. Bond Issuance</strong> — Approved bonds are issued and tracked in the system</li>
            </ul>
            <p>Open bond requests appear on your <strong>My Dashboard</strong> dashboard and in the <strong>Bonds</strong> view.</p>`,
            suggestions: ['What is my approval authority?', 'What accounts need attention?']
        };
    }

    // LOA / Letter of Authority
    if (t.includes('loa') || t.includes('letter of authority') || t.includes('authority')) {
        return {
            html: `<p>A <strong>Letter of Authority (LOA)</strong> defines the bonding limits for an account:</p>
            <ul>
                <li><strong>Single Bond Limit</strong> — Maximum size of any individual bond</li>
                <li><strong>Aggregate Limit</strong> — Maximum total bonded exposure</li>
                <li><strong>Expiration Date</strong> — LOAs are typically annual and must be renewed</li>
            </ul>
            <p>You can view and manage LOAs in the <strong>LOA Management</strong> section. Expiring LOAs will appear in your action items.</p>`,
            suggestions: ['What accounts need attention?', 'How do I submit an ARR?']
        };
    }

    // Claims
    if (t.includes('claim')) {
        return {
            html: `<p>Claims are tracked in the <strong>Claims</strong> view and affect account health:</p>
            <ul>
                <li><strong>Open Claims</strong> — Active claims being investigated or litigated</li>
                <li><strong>Reserved</strong> — Claims with loss reserves established</li>
                <li><strong>Closed</strong> — Resolved claims (paid or denied)</li>
            </ul>
            <p>Accounts with large open claims may trigger a <strong>claims review hold</strong>, which suspends new bond issuance until the claim is resolved or within acceptable parameters.</p>`,
            suggestions: ['What accounts need attention?', 'Explain bond request workflow']
        };
    }

    // Visits / Visitations
    if (t.includes('visit') || t.includes('visitation')) {
        const ytdVisits = sampleVisitations.filter(v => v.visitDate.endsWith('/2024')).length;
        return {
            html: `<p>Agency visits are tracked in the <strong>Agency Visit Log</strong>:</p>
            <ul>
                <li>You have <strong>${ytdVisits} visits YTD</strong> recorded in 2024</li>
                <li>Visits can be <strong>In-Person</strong> or <strong>Virtual</strong></li>
                <li>Each visit should include purpose, attendees, and follow-up items</li>
            </ul>
            <p>Regular agency visits are important for relationship management and risk assessment. You can log new visits from the <strong>Agency Visits</strong> view.</p>`,
            suggestions: ['What accounts need attention?', 'How do I submit an ARR?']
        };
    }

    // Premium AR / Receivables
    if (t.includes('premium') || t.includes('receivable') || t.includes(' ar ') || t.includes('ar ') || t.includes('past due') || t.includes('aging')) {
        const totalAR = samplePremiumAR.reduce((s, r) => s + r.current + r.d1_30 + r.d31_60 + r.d61_90 + r.d90plus, 0);
        const tot90plus = samplePremiumAR.reduce((s, r) => s + r.d90plus, 0);
        const totalInvoices = samplePremiumAR.reduce((s, r) => s + r.invoices, 0);
        return {
            html: `<p>The <strong>Premium AR by Agency</strong> view tracks accounts receivable aging:</p>
            <ul>
                <li>Total AR Outstanding: <strong>$${totalAR.toLocaleString()}</strong> across <strong>${totalInvoices} invoices</strong></li>
                <li>90+ Days past due: <strong>$${tot90plus.toLocaleString()}</strong></li>
                <li>AR is broken down by aging bucket: <strong>Current, 1—30, 31—60, 61—90, and 90+ Days</strong></li>
                <li>${samplePremiumAR.length} appointed agencies shown with full aging breakdown</li>
            </ul>
            <p>Agencies with high 90+ day balances should be prioritized for collection follow-up.</p>`,
            suggestions: ['What accounts need attention?', 'Explain claims process']
        };
    }

    // How long / time
    if (t.includes('how long') || t.includes('time') && t.includes('review')) {
        return {
            html: `<p>Review turnaround times vary by level:</p>
            <ul>
                <li><strong>Branch Review</strong> — Typically 1-3 business days</li>
                <li><strong>Regional Review</strong> — Typically 2-5 business days</li>
                <li><strong>Home Office Review</strong> — Typically 3-7 business days</li>
            </ul>
            <p>You can track how long each ARR has been in queue from the <strong>My Account Review Reports</strong> section — the "Days in Queue" column shows current wait time.</p>`,
            suggestions: ['What are the review queue statuses?', 'How do I submit an ARR?']
        };
    }

    // Reactivate
    if (t.includes('reactivate') || t.includes('unsuspend') || t.includes('reinstate')) {
        return {
            html: `<p>To <strong>reactivate a suspended account</strong>:</p>
            <ul>
                <li>Review and resolve the suspension reason (financial deterioration, expired LOA, claims hold, etc.)</li>
                <li>Obtain updated financials and complete a new ARR if required</li>
                <li>Submit the ARR through the review chain with a recommendation to reinstate</li>
                <li>Once approved, the account status will be changed from Suspended to Active</li>
            </ul>
            <p>The specific requirements depend on the suspension reason — check the account's <strong>Red Flags</strong> for details.</p>`,
            suggestions: ['Show me suspended accounts', 'How do I submit an ARR?']
        };
    }

    // Navigation help
    if (t.includes('navigate') || t.includes('where') || t.includes('find') || t.includes('how do i get')) {
        return {
            html: `<p>Here's how to navigate the key sections:</p>
            <ul>
                <li><strong>Sidebar</strong> — Use the left navigation to switch between views</li>
                <li><strong>My Dashboard</strong> — Your dashboard with action items, KPIs, and week-at-a-glance</li>
                <li><strong>My Accounts</strong> — All your assigned accounts (Active and Suspended)</li>
                <li><strong>Bonds</strong> — Bond requests and approvals</li>
                <li><strong>Claims</strong> — Claims tracking and management</li>
                <li><strong>Red Flags</strong> — Risk alerts and compliance issues</li>
            </ul>`,
            suggestions: ['What accounts need attention?', 'How do I submit an ARR?']
        };
    }

    // Greeting
    if (t.includes('hello') || t.includes('hi') || t === 'hey' || t.includes('good morning') || t.includes('good afternoon')) {
        return {
            html: `<p>Hello, ${currentUser.name}! How can I help you today? I can answer questions about your accounts, workflows, bond requests, and more.</p>`,
            suggestions: ['What accounts need attention?', 'How do I submit an ARR?', 'Explain bond request workflow']
        };
    }

    // Thank you
    if (t.includes('thank') || t.includes('thanks')) {
        return {
            html: `<p>You're welcome! Let me know if you have any other questions.</p>`,
            suggestions: ['What accounts need attention?', 'How do I submit an ARR?']
        };
    }

    // Default fallback
    return {
        html: `<p>I'm not sure I have a specific answer for that, but here are some topics I can help with:</p>
        <ul>
            <li>Account review reports (ARRs) and the submission process</li>
            <li>Bond request workflows and approval authority</li>
            <li>Account status, risk flags, and suspended accounts</li>
            <li>LOA management and expiration tracking</li>
            <li>Claims overview and impact on accounts</li>
            <li>Navigation and feature guidance</li>
        </ul>
        <p>Try asking about one of these topics, or rephrase your question and I'll do my best to help!</p>`,
        suggestions: ['How do I submit an ARR?', 'What accounts need attention?', 'Explain bond request workflow']
    };
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    // Render dashboard via widget system
    renderDashboardLayout();
    // Render non-dashboard views
    renderBondRequests('bond-requests-full-list', sampleBondRequests);
    renderFinancials();
    renderWIPSummary();
    renderMasterJobs();
    renderLargestJobs();
    renderLOAGrid();
    renderBidLog();
    renderAccountReviewSummary();
    renderBonds();
    renderClaims();
    renderExposureMap();
    initMapTooltips();
    renderConversationList();
    renderAccountNotesList();
    renderMyAccounts();
    renderRedFlags();
    renderVisitations();
    renderBidCalendar();
    renderPortfolioAnalysis();
    renderLOAView();
    updateBondRequestBadge();
    renderPremiumAR();
});
