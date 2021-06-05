function fetchImages(searchQuery, pageNumber) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=21869034-2ecf67829261e86afc712c967`,
  ).then(response => {
    console.log(response.json);
    return response.json();
  });
}

export default { fetchImages };
