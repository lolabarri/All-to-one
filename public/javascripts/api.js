const getSimpson = () => {
  return axios.get("https://thesimpsonsquoteapi.glitch.me/quotes"
  ).then(res=>{
    let image = res.data.image;
    let imageEl = $('<img>').attr('src',image);
    return imageEl
  })
}

const printSimpson = (image) =>{
  let el = $('<div>').addClass('profilePic');
  let nameEl = $('<p>').text(`#${id} ${name}`);
  let imageEl = $('<img>').attr('src',sprite)
  el.append([nameEl, imageEl]);
  $('.pokemons').append(el);
}