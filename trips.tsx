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
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Calendar, MapPin, Clock, Users, Plane, Camera, MoveHorizontal as MoreHorizontal, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const upcomingTrips = [
  {
    id: 1,
    destination: 'Tokyo, Japan',
    dates: 'Mar 15 - Mar 22, 2024',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    daysLeft: 12,
    travelers: 2,
    status: 'confirmed',
    activities: 8,
    progress: 75,
  },
  {
    id: 2,
    destination: 'Santorini, Greece',
    dates: 'Apr 10 - Apr 17, 2024',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800',
    daysLeft: 38,
    travelers: 4,
    status: 'planning',
    activities: 5,
    progress: 45,
  },
];

const pastTrips = [
  {
    id: 3,
    destination: 'Bali, Indonesia',
    dates: 'Dec 20 - Dec 27, 2023',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    photos: 127,
    memories: 'Amazing temples and beaches',
  },
  {
    id: 4,
    destination: 'Paris, France',
    dates: 'Oct 5 - Oct 12, 2023',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    photos: 89,
    memories: 'Romantic city with incredible food',
  },
];

const tripTasks = [
  { id: 1, task: 'Book flights', completed: true },
  { id: 2, task: 'Reserve hotel', completed: true },
  { id: 3, task: 'Get travel insurance', completed: false },
  { id: 4, task: 'Plan itinerary', completed: false },
  { id: 5, task: 'Pack luggage', completed: false },
];

export default function TripsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [tasks, setTasks] = useState(tripTasks);

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            style={styles.addGradient}
          >
            <Plus size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
              Past Trips
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'upcoming' ? (
          <>
            {/* Upcoming Trips */}
            {upcomingTrips.map((trip) => (
              <TouchableOpacity key={trip.id} style={styles.tripCard}>
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                <View style={styles.tripContent}>
                  <View style={styles.tripHeader}>
                    <View style={styles.tripInfo}>
                      <Text style={styles.tripDestination}>{trip.destination}</Text>
                      <View style={styles.tripDates}>
                        <Calendar size={14} color="#6b7280" />
                        <Text style={styles.tripDatesText}>{trip.dates}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <MoreHorizontal size={20} color="#6b7280" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.tripStats}>
                    <View style={styles.stat}>
                      <Clock size={16} color="#2563eb" />
                      <Text style={styles.statText}>{trip.daysLeft} days left</Text>
                    </View>
                    <View style={styles.stat}>
                      <Users size={16} color="#10b981" />
                      <Text style={styles.statText}>{trip.travelers} travelers</Text>
                    </View>
                    <View style={styles.stat}>
                      <Camera size={16} color="#f59e0b" />
                      <Text style={styles.statText}>{trip.activities} activities</Text>
                    </View>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressLabel}>Planning Progress</Text>
                      <Text style={styles.progressPercent}>{trip.progress}%</Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${trip.progress}%` }]} />
                    </View>
                  </View>

                  <View style={styles.statusContainer}>
                    <View style={[
                      styles.statusBadge,
                      trip.status === 'confirmed' ? styles.confirmedBadge : styles.planningBadge
                    ]}>
                      <Text style={[
                        styles.statusText,
                        trip.status === 'confirmed' ? styles.confirmedText : styles.planningText
                      ]}>
                        {trip.status === 'confirmed' ? 'Confirmed' : 'Planning'}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Trip Tasks */}
            <View style={styles.tasksSection}>
              <Text style={styles.sectionTitle}>Trip Checklist</Text>
              <View style={styles.tasksContainer}>
                {tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskItem}
                    onPress={() => toggleTask(task.id)}
                  >
                    {task.completed ? (
                      <CheckCircle size={20} color="#10b981" />
                    ) : (
                      <Circle size={20} color="#d1d5db" />
                    )}
                    <Text style={[
                      styles.taskText,
                      task.completed && styles.completedTaskText
                    ]}>
                      {task.task}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          /* Past Trips */
          <>
            {pastTrips.map((trip) => (
              <TouchableOpacity key={trip.id} style={styles.tripCard}>
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                <View style={styles.tripContent}>
                  <View style={styles.tripHeader}>
                    <View style={styles.tripInfo}>
                      <Text style={styles.tripDestination}>{trip.destination}</Text>
                      <View style={styles.tripDates}>
                        <Calendar size={14} color="#6b7280" />
                        <Text style={styles.tripDatesText}>{trip.dates}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <MoreHorizontal size={20} color="#6b7280" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.tripMemories}>{trip.memories}</Text>

                  <View style={styles.tripStats}>
                    <View style={styles.stat}>
                      <Text style={styles.ratingText}>⭐ {trip.rating}</Text>
                    </View>
                    <View style={styles.stat}>
                      <Camera size={16} color="#6b7280" />
                      <Text style={styles.statText}>{trip.photos} photos</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Create New Trip CTA */}
        <TouchableOpacity style={styles.createTripCard}>
          <LinearGradient
            colors={['#f3f4f6', '#e5e7eb']}
            style={styles.createTripGradient}
          >
            <View style={styles.createTripContent}>
              <View style={styles.createTripIcon}>
                <Plus size={32} color="#6b7280" />
              </View>
              <Text style={styles.createTripTitle}>Plan Your Next Adventure</Text>
              <Text style={styles.createTripSubtitle}>
                Create a new trip and start planning your perfect getaway
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
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
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addGradient: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#1f2937',
  },
  tripCard: {
    marginHorizontal: 20,
    marginBottom: 16,
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
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 160,
  },
  tripContent: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  tripDates: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripDatesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  moreButton: {
    padding: 4,
  },
  tripStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  progressPercent: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 3,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confirmedBadge: {
    backgroundColor: '#dcfce7',
  },
  planningBadge: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  confirmedText: {
    color: '#166534',
  },
  planningText: {
    color: '#92400e',
  },
  tripMemories: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  tasksSection: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  tasksContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  taskText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  createTripCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  createTripGradient: {
    padding: 32,
    alignItems: 'center',
  },
  createTripContent: {
    alignItems: 'center',
  },
  createTripIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  createTripTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  createTripSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});