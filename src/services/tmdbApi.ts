
const TMDB_API_KEY = ''; // You'll need to add your TMDB API key here
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// For now, we'll use mock data that simulates TMDB API responses
// To use real TMDB data, you'll need to get an API key from https://www.themoviedb.org/settings/api

export const fetchTrendingMovies = async () => {
  try {
    // Uncomment and use this when you have a TMDB API key:
    // const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
    // const data = await response.json();
    // return data.results;

    // Mock data that simulates TMDB API structure
    return [
      {
        id: 872585,
        title: "Oppenheimer",
        poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        vote_average: 8.3,
        release_date: "2023-07-21",
        overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        backdrop_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg"
      },
      {
        id: 346698,
        title: "Barbie",
        poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        vote_average: 7.2,
        release_date: "2023-07-21",
        overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
        backdrop_path: "/ctmA4ROkGRwBOWlMnJjOQW8Zn8R.jpg"
      },
      {
        id: 298618,
        title: "The Flash",
        poster_path: "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
        vote_average: 6.8,
        release_date: "2023-06-16",
        overview: "When Barry Allen uses his superpowers to travel back in time in order to change the events of the past.",
        backdrop_path: "/yF1eOkaYvwiORauRCPWznV9xVvi.jpg"
      },
      {
        id: 385687,
        title: "Fast X",
        poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        vote_average: 7.3,
        release_date: "2023-05-19",
        overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted every foe.",
        backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg"
      },
      {
        id: 447365,
        title: "Guardians of the Galaxy Vol. 3",
        poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        vote_average: 8.1,
        release_date: "2023-05-05",
        overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe.",
        backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3Gm6BAUR.jpg"
      },
      {
        id: 502356,
        title: "The Super Mario Bros. Movie",
        poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        vote_average: 7.8,
        release_date: "2023-04-05",
        overview: "A plumber named Mario travels through an underground labyrinth with his brother Luigi.",
        backdrop_path: "/nLBRD7UPR6GjmWQp6ASAfCTaWKX.jpg"
      },
      {
        id: 677179,
        title: "Creed III",
        poster_path: "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
        vote_average: 7.3,
        release_date: "2023-03-03",
        overview: "After dominating the boxing world, Adonis Creed has been thriving in both his career and family life.",
        backdrop_path: "/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg"
      },
      {
        id: 594767,
        title: "Shazam! Fury of the Gods",
        poster_path: "/2VK4d3mqqTc7LVZLnLPeRiPaJ71.jpg",
        vote_average: 6.7,
        release_date: "2023-03-17",
        overview: "Billy Batson and his foster siblings, who transform into superheroes by saying 'Shazam!'",
        backdrop_path: "/e2Jd0sYMCe6qvMbdju4h0ooVfil.jpg"
      }
    ];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    // Mock data for top rated movies
    return [
      {
        id: 238,
        title: "The Godfather",
        poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        vote_average: 9.2,
        release_date: "1972-03-14",
        overview: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
        backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg"
      },
      {
        id: 278,
        title: "The Shawshank Redemption",
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        vote_average: 9.3,
        release_date: "1994-09-23",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
        backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg"
      },
      {
        id: 240,
        title: "The Godfather Part II",
        poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
        vote_average: 9.0,
        release_date: "1974-12-20",
        overview: "The early life and career of Vito Corleone in 1920s New York City is portrayed.",
        backdrop_path: "/kGzFbGhp99zva6oZODW5atUtnqi.jpg"
      },
      {
        id: 424,
        title: "Schindler's List",
        poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
        vote_average: 8.9,
        release_date: "1993-12-15",
        overview: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned.",
        backdrop_path: "/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg"
      },
      {
        id: 19404,
        title: "Dilwale Dulhania Le Jayenge",
        poster_path: "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
        vote_average: 8.7,
        release_date: "1995-10-20",
        overview: "A young man and woman fall in love on a Europe trip.",
        backdrop_path: "/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg"
      },
      {
        id: 389,
        title: "12 Angry Men",
        poster_path: "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
        vote_average: 8.9,
        release_date: "1957-04-10",
        overview: "A jury holds the fate of a young man in their hands.",
        backdrop_path: "/qqHQsStV6exghCM7zbObuYBiYid.jpg"
      }
    ];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    // Mock data for upcoming movies
    return [
      {
        id: 695721,
        title: "The Hunger Games: The Ballad of Songbirds & Snakes",
        poster_path: "/mBaXZ95R2OxueZhvQbcEWy2DqyJ.jpg",
        vote_average: 7.8,
        release_date: "2023-11-17",
        overview: "Years before he would become the tyrannical President of Panem, 18-year-old Coriolanus Snow.",
        backdrop_path: "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg"
      },
      {
        id: 507089,
        title: "Five Nights at Freddy's",
        poster_path: "/j8cKZ4XsAe0ZvmGGDoR8S2F5OLi.jpg",
        vote_average: 6.2,
        release_date: "2023-10-27",
        overview: "A troubled security guard begins working at Freddy Fazbear's Pizza.",
        backdrop_path: "/yYiuSeBx5adyJaDqNyqfTMNsjCX.jpg"
      },
      {
        id: 968051,
        title: "The Nun II",
        poster_path: "/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
        vote_average: 6.8,
        release_date: "2023-09-08",
        overview: "In 1956 France, a priest is murdered, and Sister Irene begins to investigate.",
        backdrop_path: "/qEm4ClZbIQOhP36zjvDeEl3hWil.jpg"
      },
      {
        id: 926393,
        title: "The Equalizer 3",
        poster_path: "/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg",
        vote_average: 7.3,
        release_date: "2023-08-30",
        overview: "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses.",
        backdrop_path: "/3C8VlZnmhvNe9XYgUBfCPOJrPG5.jpg"
      }
    ];
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

export const searchMovies = async (query: string) => {
  try {
    // Mock search results
    const allMovies = [
      ...(await fetchTrendingMovies()),
      ...(await fetchTopRatedMovies()),
      ...(await fetchUpcomingMovies())
    ];
    
    return allMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};
