/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useGoogleAnalytics } from '@package/useGoogleAnalytics';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  const logged_in = useSelector((state) => state.userSession.token);
  useGoogleAnalytics();
  return (
    <Segment
      role="contentinfo"
      vertical
      padded
      inverted
      color="grey"
      textAlign="center"
      id="footer"
    >
      <Container>
        <Segment basic inverted color="grey" className="discreet">
          <FormattedMessage
            id="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            defaultMessage="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            values={{
              plonecms: (
                <FormattedMessage
                  id="Plone{reg} Open Source CMS/WCM"
                  defaultMessage="Plone{reg} Open Source CMS/WCM"
                  values={{ reg: <sup>®</sup> }}
                />
              ),
              copyright: (
                <abbr title={intl.formatMessage(messages.copyright)}>©</abbr>
              ),
              current_year: new Date().getFullYear(),
              plonefoundation: (
                <a className="item" href="http://plone.org/foundation">
                  <FormattedMessage
                    id="Plone Foundation"
                    defaultMessage="Plone Foundation"
                  />
                </a>
              ),
            }}
          />{' '}
          <FormattedMessage
            id="Distributed under the {license}."
            defaultMessage="Distributed under the {license}."
            values={{
              license: (
                <a
                  className="item"
                  href="http://creativecommons.org/licenses/GPL/2.0/"
                >
                  <FormattedMessage
                    id="GNU GPL license"
                    defaultMessage="GNU GPL license"
                  />
                </a>
              ),
            }}
          />
        </Segment>
        <List horizontal inverted>
          {/* wrap in div for a11y reasons: listitem role cannot be on the <a> element directly */}
          <div role="listitem" className="item">
            {logged_in && (
              <Link className="item" to="/logout">
                <FormattedMessage id="Logout" defaultMessage="Logout" />
              </Link>
            )}
            {!logged_in && (
              <Link className="item" to="/login">
                <FormattedMessage id="Login" defaultMessage="Login" />
              </Link>
            )}
          </div>
          <div role="listitem" className="item">
            <Link className="item" to="/code-of-conduct">
              <FormattedMessage
                id="Code of Conduct"
                defaultMessage="Code of Conduct"
              />
            </Link>
          </div>
          <div role="listitem" className="item">
            <Link className="item" to="/sitemap">
              <FormattedMessage id="Site Map" defaultMessage="Site Map" />
            </Link>
          </div>
          <div role="listitem" className="item">
            <a className="item" href="https://plone.org">
              <FormattedMessage
                id="Powered by Plone & Python"
                defaultMessage="Powered by Plone & Python"
              />
            </a>
          </div>
        </List>
      </Container>
    </Segment>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
