//configure
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
//components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button"
//Hook
import { useHomeFetch } from "./../hooks/useHomeFetch";

//Image
import NoImage from "../images/no_image.jpg";

const Home = () => {
  //and put this here searchTerm
  const { state, loading,
    error,
    setSearchTerm,
    searchTerm,
    setIsLoadingMore,
    
  } =
    useHomeFetch();

  

  console.log(state);

  if (error) return <div>Somting wrong .....</div>

  return (
    <>

      {/*and make condition here by searchTerm && for hiden the hero photo */}
      {!searchTerm && state.results[2] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[2].backdrop_path}`}
          title={`${state.results[2].original_title}`}
          text={`${state.results[2].overview}`}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Result' : "Popular Movies"}>
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text='Load More' 

        callback={()=>setIsLoadingMore(true)}
        
        />
      )}
    </>
  );
};

export default Home;
