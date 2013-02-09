require 'rack/contrib/jsonp'
require 'rack/ssl'
require 'json'

class Hangout
  def initialize(app)
    @app = app
  end
  def call(env)
    request = Rack::Request.new(env)
    if request.path =~ /layout/
      html = File.read('./public/layout.html')
      [200, { 'Content-Type' => 'application/json' }, [{html: html}.to_json] ]
    else
      @app.call(env)
    end
  end
end

use Rack::SSL
use Rack::JSONP
use Hangout
run Rack::Directory.new("./public/")
