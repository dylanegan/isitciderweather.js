if ENV["RACK_ENV"] == "production"
  require "rack/ssl-enforcer"
  use Rack::SslEnforcer
end

use Rack::Static,
  :urls => [
    "/.well-known/acme-challenge",
    "/stylesheets",
    "/images",
    "/javascripts",
    "/favicon.ico"],
  :root => "public"

run lambda { |env|
  [200, {
    'Content-Type' => 'text/html',
    'Cache-Control' => 'public, max-age=86400' },
    File.open('public/index.html', File::RDONLY)]
}
