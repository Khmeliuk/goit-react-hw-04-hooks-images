export default function api(searchWord, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${searchWord}&page=${page}&key=23293955-a7595990e0e78e906d7de269f&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => {
    if (res.ok) return res.json();
    else {
      return Promise.reject(new Error("find nothing"));
    }
  });
}
