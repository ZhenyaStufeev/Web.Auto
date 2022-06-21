DECLARE @SCHEMA NVARCHAR(50);
SET @SCHEMA = (SELECT TOP 1 TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA != 'dbo');

if(@SCHEMA is NULL)
	SET @SCHEMA = (SELECT TOP 1 TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA = 'dbo')

DECLARE @request nvarchar(1000);

DECLARE @dto NVARCHAR(50);
SET @dto = N'['; 
SET @dto += (@SCHEMA);
SET @dto += N'].[vFilterNameGroups]';

DECLARE @execToDelete NVARCHAR(50);
SET @execToDelete = N'drop table ';
SET @execToDelete += @dto;

IF EXISTS (SELECT * FROM sys.tables WHERE object_id = OBJECT_ID(@dto))
EXEC dbo.sp_executesql @Delete = @execToDelete;


SET @request = N'CREATE VIEW [';
SET @request += (@SCHEMA);
SET @request += N'].[vFilterNameGroups]';
SET @request += N'AS SELECT NEWID() AS Id, fn.Id AS FilterNameId, fn.[Name] as FilterName, fv.Id AS FilterValueId, fv.[Name] AS FilterValue FROM [';
SET @request += (@SCHEMA);
SET @request += N'].[tblFilterNames] as fn left join [';
SET @request += (@SCHEMA); 
SET @request += N'].[tblFilterNameGroups] as fng ON fn.Id = fng.FilterNameId left join [';
SET @request += (@SCHEMA);
SET @request += N'].[tblFilterValues] as fv ON fv.Id = fng.FilterValueId';



IF NOT EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(@dto))
EXEC dbo.sp_executesql @statement = @request;