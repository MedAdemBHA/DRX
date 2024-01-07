
-- For annee column
-- For mois column
ALTER TABLE notes
ALTER COLUMN mois INT NULL -- Assuming the column allows NULL values
    CONSTRAINT DF_notes_mois DEFAULT MONTH(GETDATE());

-- For annee column
ALTER TABLE notes
ALTER COLUMN annee INT NULL -- Assuming the column allows NULL values
    CONSTRAINT DF_notes_annee DEFAULT YEAR(GETDATE());

