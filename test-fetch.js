fetch("https://kbusinessacademy.com/api/gallery?status=published&limit=50", {
  headers: { "Accept": "application/json" }
})
  .then(res => {
    console.log("Status:", res.status);
    console.log("Content-Type:", res.headers.get("content-type"));
    return res.text();
  })
  .then(text => console.log(text.substring(0, 200)))
  .catch(console.error);
