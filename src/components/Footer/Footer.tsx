// import Text from '../Text';
// import FooterLinks from './FooterLinks';
// import FooterMenu from './FooterMenu';
import FooterTerms from './FooterTerms';

function Footer() {
  return (
    <div className="pm-l-footer">
      <FooterTerms />
      {/* <Text
        as="p"
        scale="caption"
        fontWeight="semibold"
        className="pm-l-footer__credits"
      >
        @ 2021 Polkamarkets
      </Text>
      <div className="pm-l-footer__actions">
        <FooterMenu />
        <FooterLinks />
      </div> */}
    </div>
  );
}

export default Footer;
