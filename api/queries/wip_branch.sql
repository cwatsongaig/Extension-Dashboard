-- WIP by Account IDs — for sampleWIPJobs on dashboard load
-- Parameters: @AccountIds (comma-separated BondBox Account IDs)
-- Runs against Bonds_Financial_Entry database
SELECT TOP 200
    FORMAT(ws.ScheduleDate, 'MM/dd/yyyy') AS ScheduleDate,
    ws.ScheduleID,
    bba.AccountID,
    bba.AccountName,
    nn.JobName,
    nn.JobNumber,
    nn.BondNumber,
    wj.ContractPrice,
    wj.BilledToDate,
    wj.CostToDate,
    wj.CostToComplete,
    wj.TotalCost,
    wj.TotalGrossProfit,
    wj.TotalGrossProfitPercentage AS GrossProfitPct,
    wj.PercentComplete
FROM dbo.tblWIPJob wj
INNER JOIN dbo.tblWipJobNameNumber nn ON wj.JobID = nn.JobID
INNER JOIN dbo.tblWIPSchedule ws ON wj.ScheduleID = ws.ScheduleID
INNER JOIN dbo.tblBondBoxAccounts bba ON ws.BondBoxAccountID = bba.BondBoxAccountsID
WHERE bba.AccountID IN (@AccountIds)
  AND wj.ContractPrice > 0
ORDER BY ws.ScheduleDate DESC, wj.ContractPrice DESC
