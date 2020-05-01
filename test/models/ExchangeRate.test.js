const ExchangeRate = require('../../app/models/ExchangeRate');
const connectToDatabase = require('../../config/db');

const exampleExchangeRate = {
  baseCurrency: 'EUR',
  targetCurrency: 'USD',
  originalValue: 50,
  feePercentage: 10
};

describe('ExchangeRate', () => {
  describe('create', () => {
    let exchangeRate = null;
    let connection = null;
    beforeAll(async done => {
      connection = await connectToDatabase();
      await ExchangeRate.create(exampleExchangeRate);
      exchangeRate = await ExchangeRate.findOne(exampleExchangeRate);
      return done();
    });
    afterAll(done => connection.connection.db.dropDatabase().then(() => done()));

    it('exchangeRate has baseCurrency property', () => {
      expect(exchangeRate.baseCurrency).toBe('EUR');
    });
    it('exchangeRate has targetCurrency property', () => {
      expect(exchangeRate.targetCurrency).toBe('USD');
    });
    it('exchangeRate has originalValue property', () => {
      expect(exchangeRate.originalValue).toBe(50);
    });
    it('exchangeRate has feePercentage property', () => {
      expect(exchangeRate.feePercentage).toBe(10);
    });
    it('exchangeRate has feeAmount property', () => {
      expect(exchangeRate.feeAmount).toBe(5);
    });
    it('exchangeRate has valueWithFeeApplied property', () => {
      expect(exchangeRate.valueWithFeeApplied).toBe(55);
    });
    it('ExchangeRate collection has one document', async () => {
      const count = await ExchangeRate.countDocuments();
      expect(count).toBe(1);
    });
  });
});