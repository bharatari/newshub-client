import access from '../access';
import chai from 'chai';

const expect = chai.expect;

describe.only('(Utils) Access', () => {
  describe('#convertURL', () => {
    it('should convert new url to permission', () => {
      const expected = 'reservation:create';
      const url = '/app/reservation/new';

      expect(access.convertToPermission(url)).to.equal(expected);
    });

    it('should convert item url to permission', () => {
      const expected = 'reservation:view'
      const url = '/app/reservation/84';

      expect(access.convertToPermission(url)).to.equal(expected);
    });

    it('should convert items url to permission', () => {
      const expected = 'reservation:view'
      const url = '/app/reservation';

      expect(access.convertToPermission(url)).to.equal(expected);
    });
  });
});
