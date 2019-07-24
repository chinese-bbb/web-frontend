# Architecture

## Domain resolving

> see https://gist.github.com/bradwestfall/b5b0e450015dbc9b4e56e5f398df48ff

1. we setup `huxingongyi.com` record set in route53, aliasing to address in cloudfront. Common subdomain `www.huxingongyi.com` also refer to same address in cloudfront.
2. in cloudfront, we point the cloudfront subdomain to hosted website address in s3 like `huxingongyi.com.s3-website.us-east-2.amazonaws.com`
3. for `api.huxingongyi.com`, we alias it in route53 to eb environment public address.

## SSL Certificates

> To use an ACM Certificate with Amazon CloudFront, you must request or import the certificate in the US East (N. Virginia) region.
> see https://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html

we must create a cert in region us-east-1 for cloudfront to use it. However, our elastic beanstalk(api service) is deployed in region us-east-2(ohio). This drives to make another cert in region us-east-2 with identical content and different footprints.

see:
- https://serverfault.com/questions/525581/multiple-ssl-certificates-for-a-single-domain-on-different-servers
- https://community.letsencrypt.org/t/different-certificate-for-same-domain-at-once/72201
- https://security.stackexchange.com/questions/121722/same-certificate-but-different-private-keys-on-different-servers-does-this-work

