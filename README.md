# MachineLearningMarketTracker-Backend
to create the database structute, use:


CREATE TABLE User (
	Email VARCHAR(320) NOT NULL,
	Password VARCHAR(128) NOT NULL,
	PRIMARY KEY (Email)
);

CREATE TABLE Settings (
	Email VARCHAR(320) NOT NULL,
	Language VARCHAR(6) NOT NULL,
	Theme VARCHAR(7) NOT NULL,
	PRIMARY KEY (Email),
	FOREIGN KEY (Email) REFERENCES User(Email)
);

CREATE TABLE Portfolio (
	Id INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(24) NOT NULL,
	Email VARCHAR(320) NOT NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (Email) REFERENCES User(Email)
);

CREATE TABLE PortfolioItem (
    Id INT NOT NULL AUTO_INCREMENT,
    PortfolioId INT,
    Ticker VARCHAR(24),
    PRIMARY KEY (Id),
    FOREIGN KEY (PortfolioId) REFERENCES Portfolio(Id),
    UNIQUE KEY unique_portfolio_ticker (PortfolioId, Ticker)
);


CREATE TABLE PredictorItem (
    Id INT NOT NULL AUTO_INCREMENT,
    Ticker VARCHAR(5),
    Email VARCHAR(320) NOT NULL,
    PRIMARY KEY (Id),
    UNIQUE KEY unique_predictor_ticker (Email, Ticker)
);

CREATE TABLE Prediction (
    Id INT NOT NULL AUTO_INCREMENT,
    Ticker VARCHAR(5),
    Close DECIMAL(10, 2),
    PRIMARY KEY (Id),
    UNIQUE KEY unique_predictor_ticker (Ticker)
);



CREATE TABLE Stock (
	Id INT NOT NULL AUTO_INCREMENT,
	Ticker VARCHAR(5),
	Date DATE,
	Open DECIMAL(10, 2),
	High DECIMAL(10, 2),
	Low DECIMAL(10, 2),
	Close DECIMAL(10, 2),
	Volume INT,
	PRIMARY KEY (Id),
	UNIQUE KEY unique_stock (Ticker, Date) 
);

CREATE TABLE CompanyInformation (
	Ticker VARCHAR(5),
	Name VARCHAR(320),
	PRIMARY KEY (Ticker)
);

