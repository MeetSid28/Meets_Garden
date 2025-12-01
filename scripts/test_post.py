import urllib.request, urllib.parse
url='http://127.0.0.1:5000/authenticate'
data=urllib.parse.urlencode({'answer':'yes'}).encode()
req=urllib.request.Request(url,data=data,method='POST')
resp=urllib.request.urlopen(req)
print('Response status:', resp.getcode())
print('Redirect url:', resp.geturl())
print(resp.read(200).decode(errors='ignore'))
