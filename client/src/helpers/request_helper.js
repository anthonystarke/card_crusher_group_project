const RequestHelper = function (url) {
  this.url = url;
};

RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then((response) => response.json());
};

RequestHelper.prototype.post = function (payload) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type' : 'application/json'}
  })
    .then((response) => response.json());
};

<<<<<<< HEAD
RequestHelper.prototype.put = function(payload, urlParam) {
  const url = urlParam ? `${this.url}/${urlParam}` : this.url;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
=======
RequestHelper.prototype.put = function (id, payload) {

  console.log(`${this.url}/${id}`)
  return fetch(`${this.url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type' : 'application/json'}
  })
    .then((response) => response.json());
}

>>>>>>> feature/continue_changes

RequestHelper.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};

module.exports = RequestHelper;
