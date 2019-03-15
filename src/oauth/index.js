import OAuth2Server from 'oauth2-server';
import model from './model';

export default new OAuth2Server({
    model,
    accessTokenLifetime: 60 * 3,
    allowBearerTokensInQueryString: true,
});




