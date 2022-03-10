require 'digest'
require 'openssl'

class XPayUtils
  def get_xpay_token(resource_path, query_string, request_body)
    timestamp = Time.now.utc.to_i
    config = YAML.load_file('configuration.yml')
    shared_secret = config['sharedSecret']
    hash_input = "#{timestamp}#{resource_path}#{query_string}#{request_body}"
    hash_output = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), shared_secret, hash_input)
    "xv2:#{timestamp}:#{hash_output}"
  end
end
