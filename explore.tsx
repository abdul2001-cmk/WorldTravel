import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Users,
  Heart,
  Bookmark,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'all', name: 'All', active: true },
  { id: 'beach', name: 'Beach' },
  { id: 'mountain', name: 'Mountain' },
  { id: 'city', name: 'City' },
  { id: 'culture', name: 'Culture' },
  { id: 'adventure', name: 'Adventure' },
];

const destinations = [
  {
    id: 1,
    name: 'Machu Picchu',
    location: 'Peru',
    image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 2847,
    price: 599,
    duration: '7 days',
    category: 'adventure',
    description: 'Ancient Incan citadel high in the Andes Mountains',
    highlights: ['UNESCO World Heritage', 'Hiking', 'History'],
  },
  {
    id: 2,
    name: 'Amalfi Coast',
    location: 'Italy',
    image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 1923,
    price: 899,
    duration: '5 days',
    category: 'beach',
    description: 'Stunning coastal scenery with charming villages',
    highlights: ['Scenic Drives', 'Local Cuisine', 'Photography'],
  },
  {
    id: 3,
    name: 'Kyoto',
    location: 'Japan',
    image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 3156,
    price: 749,
    duration: '6 days',
    category: 'culture',
    description: 'Traditional temples and beautiful gardens',
    highlights: ['Temples', 'Gardens', 'Tea Ceremony'],
  },
  {
    id: 4,
    name: 'Banff National Park',
    location: 'Canada',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 1654,
    price: 459,
    duration: '4 days',
    category: 'mountain',
    description: 'Pristine wilderness and stunning mountain lakes',
    highlights: ['Hiking', 'Wildlife', 'Photography'],
  },
  {
    id: 5,
    name: 'Dubai',
    location: 'UAE',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 2341,
    price: 1299,
    duration: '5 days',
    category: 'city',
    description: 'Modern metropolis with luxury and innovation',
    highlights: ['Skyscrapers', 'Shopping', 'Desert Safari'],
  },
  {
    id: 6,
    name: 'Maldives',
    location: 'Maldives',
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 1876,
    price: 1899,
    duration: '7 days',
    category: 'beach',
    description: 'Tropical paradise with crystal clear waters',
    highlights: ['Overwater Bungalows', 'Snorkeling', 'Spa'],
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || destination.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, cities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              activeCategory === category.id && styles.activeCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.resultsContainer}>
        <Text style={styles.resultsCount}>
          {filteredDestinations.length} destinations found
        </Text>
        
        {filteredDestinations.map((destination) => (
          <TouchableOpacity key={destination.id} style={styles.destinationCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: destination.image }} style={styles.destinationImage} />
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(destination.id)}
              >
                <Heart 
                  size={20} 
                  color={favorites.includes(destination.id) ? "#ef4444" : "#ffffff"}
                  fill={favorites.includes(destination.id) ? "#ef4444" : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookmarkButton}>
                <Bookmark size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.destinationContent}>
              <View style={styles.destinationHeader}>
                <View style={styles.destinationTitleContainer}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <View style={styles.locationContainer}>
                    <MapPin size={14} color="#6b7280" />
                    <Text style={styles.destinationLocation}>{destination.location}</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${destination.price}</Text>
                  <Text style={styles.priceLabel}>per person</Text>
                </View>
              </View>
              
              <Text style={styles.description}>{destination.description}</Text>
              
              <View style={styles.highlights}>
                {destination.highlights.slice(0, 3).map((highlight, index) => (
                  <View key={index} style={styles.highlightTag}>
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.destinationMeta}>
                <View style={styles.rating}>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.ratingText}>{destination.rating}</Text>
                  <Text style={styles.reviewsText}>({destination.reviews} reviews)</Text>
                </View>
                <View style={styles.duration}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.durationText}>{destination.duration}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeCategoryButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  destinationCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  destinationImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 56,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationContent: {
    padding: 16,
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  destinationTitleContainer: {
    flex: 1,
  },
  destinationName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  destinationLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2563eb',
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  highlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  highlightTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#eff6ff',
    borderRadius: 6,
  },
  highlightText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  destinationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  reviewsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
});