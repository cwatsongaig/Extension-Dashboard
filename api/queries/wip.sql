-- WIP (Status of Contracts) by Account — for sampleWIPJobs / sampleWIPSchedules
-- Parameters: @AccountId (BondBox AccountID)
-- Runs against Bonds_Financial_Entry database
SELECT
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
    wj.PercentComplete,
    wj.WIP,
    wj.ProfitETD,
    wj.OverBillings,
    wj.UnderBillings,
    wj.BacklogProfit
FROM dbo.tblWIPJob wj
INNER JOIN dbo.tblWipJobNameNumber nn ON wj.JobID = nn.JobID
INNER JOIN dbo.tblWIPSchedule ws ON wj.ScheduleID = ws.ScheduleID
INNER JOIN dbo.tblBondBoxAccounts bba ON ws.BondBoxAccountID = bba.BondBoxAccountsID
WHERE bba.AccountID = @AccountId
  AND wj.ContractPrice > 0
ORDER BY ws.ScheduleDate DESC, nn.JobName
