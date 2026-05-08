-- Bid Log — for sampleBidLog
-- Parameters: @AccountId (the BondBox AccountID)
-- Uses dbo.vw_tblBid view and datamart schema tables
SELECT
    CONVERT(VARCHAR, b.BidDate, 101) AS BidDate,
    b.ProjectName,
    b.Obligee,
    b.ContractValue,
    lv_warranty.LookupValue AS Warranty,
    b.BidBondAmount,
    b.PotentialBacklog,
    lv_bidResult.LookupValue AS BidResult,
    b.BidResultAmount,
    lv_status.LookupValue AS Status,
    lv_doa.LookupValue AS Doa,
    bba.CustomerNumber,
    bba.AccountName
FROM dbo.vw_tblBid b
INNER JOIN datamart.tblBondBoxAccounts bba ON b.AccountIdBondBoxAccountsId = bba.BondBoxAccountsID
LEFT JOIN dbo.tblLookupValue lv_warranty ON b.WarrantyLookupValueId = lv_warranty.LookupValueID
LEFT JOIN dbo.tblLookupValue lv_bidResult ON b.BidResultLookupValueID = lv_bidResult.LookupValueID
LEFT JOIN dbo.tblLookupValue lv_status ON b.StatusLookupValueID = lv_status.LookupValueID
LEFT JOIN dbo.tblLookupValue lv_doa ON b.DOALookupValueId = lv_doa.LookupValueID
WHERE bba.AccountID = @AccountId
  AND b.IsDeleted = 0
ORDER BY b.BidDate DESC
