import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Star, MapPin, Clock, Share, Bookmark, Filter, Grid3x3 as Grid3X3, List } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const favoriteDestinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    location: 'Cyclades, Greece',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 2847,
    price: 299,
    category: 'Beach',
    savedDate: '2 days ago',
    description: 'Stunning sunsets and iconic white architecture',
  },
  {
    id: 2,
    name: 'Machu Picchu',
    location: 'Cusco, Peru',
    image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 3156,
    price: 599,
    category: 'Adventure',
    savedDate: '1 week ago',
    description: 'Ancient Incan citadel high in the Andes Mountains',
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    location: 'Kansai, Japan',
    image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 1923,
    price: 749,
    category: 'Culture',
    savedDate: '2 weeks ago',
    description: 'Traditional temples and beautiful gardens',
  },
  {
    id: 4,
    name: 'Maldives',
    location: 'Indian Ocean',
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 1876,
    price: 1899,
    category: 'Beach',
    savedDate: '3 weeks ago',
    description: 'Tropical paradise with crystal clear waters',
  },
  {
    id: 5,
    name: 'Banff National Park',
    location: 'Alberta, Canada',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 1654,
    price: 459,
    category: 'Nature',
    savedDate: '1 month ago',
    description: 'Pristine wilderness and stunning mountain lakes',
  },
  {
    id: 6,
    name: 'Dubai',
    location: 'UAE',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 2341,
    price: 1299,
    category: 'City',
    savedDate: '1 month ago',
    description: 'Modern metropolis with luxury and innovation',
  },
];

const categories = ['All', 'Beach', 'Adventure', 'Culture', 'Nature', 'City'];

export default function FavoritesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [favorites, setFavorites] = useState(favoriteDestinations);

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const filteredFavorites = favorites.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const renderGridItem = (item: typeof favoriteDestinations[0]) => (
    <TouchableOpacity key={item.id} style={styles.gridItem}>
      <View style={styles.gridImageContainer}>
        <Image source={{ uri: item.image }} style={styles.gridImage} />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Heart size={18} color="#ef4444" fill="#ef4444" />
        </TouchableOpacity>
      </View>
      <View style={styles.gridContent}>
        <Text style={styles.gridName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.gridRating}>
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.gridRatingText}>{item.rating}</Text>
        </View>
        <Text style={styles.gridPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderListItem = (item: typeof favoriteDestinations[0]) => (
    <TouchableOpacity key={item.id} style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.listContent}>
        <View style={styles.listHeader}>
          <View style={styles.listTitleContainer}>
            <Text style={styles.listName}>{item.name}</Text>
            <View style={styles.listLocation}>
              <MapPin size={12} color="#6b7280" />
              <Text style={styles.listLocationText}>{item.location}</Text>
            </View>
          </View>
          <View style={styles.listActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Share size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => removeFavorite(item.id)}
            >
              <Heart size={18} color="#ef4444" fill="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.listDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.listMeta}>
          <View style={styles.listRating}>
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.listRatingText}>{item.rating}</Text>
            <Text style={styles.listReviews}>({item.reviews})</Text>
          </View>
          <View style={styles.listRight}>
            <Text style={styles.listSavedDate}>{item.savedDate}</Text>
            <Text style={styles.listPrice}>${item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.subtitle}>{filteredFavorites.length} saved destinations</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <List size={20} color="#374151" />
            ) : (
              <Grid3X3 size={20} color="#374151" />
            )}
          </TouchableOpacity>
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
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.activeCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {filteredFavorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Start exploring and save your favorite destinations
            </Text>
          </View>
        ) : viewMode === 'grid' ? (
          <View style={styles.gridContainer}>
            {filteredFavorites.map(renderGridItem)}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {filteredFavorites.map(renderListItem)}
          </View>
        )}
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
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
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
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  gridItem: {
    width: (width - 52) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  gridImageContainer: {
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContent: {
    padding: 12,
  },
  gridName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  gridRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  gridRatingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  gridPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#2563eb',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  listImage: {
    width: 100,
    height: 120,
  },
  listContent: {
    flex: 1,
    padding: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listTitleContainer: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  listLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listLocationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  listActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 18,
    marginBottom: 12,
  },
  listMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listRatingText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  listReviews: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  listRight: {
    alignItems: 'flex-end',
  },
  listSavedDate: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 2,
  },
  listPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#2563eb',
  },
});