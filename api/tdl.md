Long Live Request FB PAGE ACCESS TOKEN

GENERATE USSER ACCESS TOKEN
GET https://graph.facebook.com/v23.0/oauth/access_token?grant_type=fb_exchange_token&client_id=602395726138998&client_secret={ISI_APP_SECRET}&fb_exchange_token={SHORT_LIVED_USER_TOKEN}

GENERATE PAGE TOKEN
GET /me/accounts?access_token={USER_ACCESS_TOKEN}