require 'rack/contrib/jsonp'
require 'json'


class Hangout
  #SLASH_OR_INDEX = %r{/(?:index)?}
  def initialize(app)
    @app = app
  end
  def call(env)
    request = Rack::Request.new(env)
    if request.path =~ /layout/
      html = File.read('./layout.html')
      [200, { 'Content-Type' => 'application/json' }, [{html: html}.to_json] ]
    else
      @app.call(env)
    end
  end
end

use Rack::JSONP
use Hangout
run Rack::Directory.new(".")
