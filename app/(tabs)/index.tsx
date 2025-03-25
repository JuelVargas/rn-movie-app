import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      {moviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      ) : moviesError ? (
        <Text>Error: {moviesError?.message}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          ListHeaderComponent={
            <>
              <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />
              <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest movies</Text>
            </>
          }
          renderItem={({ item }) => <Text className="text-white text-sm">{item.title}</Text>}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
        />
      )}
    </View>
  );
}
