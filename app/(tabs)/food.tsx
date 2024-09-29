import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { vw, vh } from "@/constants/Window";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "@/constants/Colors";
import DarkActButton from "@/components/DarkActButton";

type VaccinationDrive = {
  vaccinations: { name: string; ageGroup: string }[];
  time: string;
  org: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

const vaccinationDrives: VaccinationDrive[] = [
  {
    vaccinations: [
      { name: "COVID-19", ageGroup: "18+" },
      { name: "Hepatitis B", ageGroup: "All ages" },
      { name: "Tetanus", ageGroup: "10+" },
    ],
    time: "2024-09-28 10:00 AM - 4:00 PM",
    org: "Nepal Red Cross Society",
    location: "Kathmandu, Nepal",
    coordinates: {
      latitude: 27.7172,
      longitude: 85.324,
    },
  },
  {
    vaccinations: [
      { name: "Polio", ageGroup: "0-5 years" },
      { name: "Measles", ageGroup: "0-10 years" },
      { name: "Rubella", ageGroup: "All ages" },
    ],
    time: "2024-09-29 9:00 AM - 3:00 PM",
    org: "Patan Hospital",
    location: "Lalitpur, Nepal",
    coordinates: {
      latitude: 27.6675,
      longitude: 85.3206,
    },
  },
  {
    vaccinations: [
      { name: "BCG", ageGroup: "0-5 years" },
      { name: "DTP", ageGroup: "0-10 years" },
      { name: "Hepatitis A", ageGroup: "All ages" },
    ],
    time: "2024-09-30 8:00 AM - 2:00 PM",
    org: "Bir Hospital",
    location: "Kathmandu, Nepal",
    coordinates: {
      latitude: 27.7056,
      longitude: 85.3142,
    },
  },
  {
    vaccinations: [
      { name: "Typhoid", ageGroup: "10+" },
      { name: "Japanese Encephalitis", ageGroup: "All ages" },
      { name: "COVID-19", ageGroup: "18+" },
    ],
    time: "2024-10-01 11:00 AM - 5:00 PM",
    org: "Pokhara Health Center",
    location: "Pokhara, Nepal",
    coordinates: {
      latitude: 28.2096,
      longitude: 83.9856,
    },
  },
  {
    vaccinations: [
      { name: "Tetanus", ageGroup: "10+" },
      { name: "DTP", ageGroup: "0-10 years" },
      { name: "Meningitis", ageGroup: "All ages" },
    ],
    time: "2024-10-02 9:30 AM - 3:30 PM",
    org: "Dharan Public Health",
    location: "Dharan, Nepal",
    coordinates: {
      latitude: 26.8123,
      longitude: 87.283,
    },
  },
];

import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

const Food = () => {
  const [selectedDrive, setSelectedDrive] = useState<VaccinationDrive | null>(
    null
  );

  const openDriveDetails = (drive: VaccinationDrive) => {
    setSelectedDrive(drive);
  };

  const closeModal = () => {
    setSelectedDrive(null);
  };

  return (
    <View style={styles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Vaccination Tracker</Text>
      </View>

      <FlatList
        data={vaccinationDrives}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDriveDetails(item)}>
            <View style={styles.card}>
              <Text style={styles.heading}>{item.org}</Text>
              <Text style={styles.location}>Location: {item.location}</Text>
              <Text style={styles.text}>Time: {item.time}</Text>
              <Text style={styles.text}>Vaccinations:</Text>
              {item.vaccinations.map((vaccine, idx) => (
                <Text key={idx} style={styles.vaccine}>
                  - {vaccine.name} (Age: {vaccine.ageGroup})
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedDrive && (
        <Modal visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.heading}>{selectedDrive.org}</Text>
            <Text style={styles.location}>
              Location: {selectedDrive.location}
            </Text>
            <Text style={styles.text}>Time: {selectedDrive.time}</Text>
            <Text style={styles.text}>Vaccinations:</Text>
            {selectedDrive.vaccinations.map((vaccine, idx) => (
              <Text key={idx} style={styles.vaccine}>
                - {vaccine.name} (Age: {vaccine.ageGroup})
              </Text>
            ))}
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedDrive.coordinates.latitude,
                longitude: selectedDrive.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: selectedDrive.coordinates.latitude,
                  longitude: selectedDrive.coordinates.longitude,
                }}
                title={selectedDrive.org}
                description={selectedDrive.location}
              />
            </MapView>
           <TouchableOpacity style={styles.btn} onPress={closeModal}>
              <Text style={styles.btnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    backgroundColor: "#1c1c1c", // Shade of black
  },
  titleBar: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  titleText: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    margin: 0,
    backgroundColor: Colors.darkBackground, // Card color
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  heading: {
    fontSize: 26,
    fontFamily: 'NuintoEBold',
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.white
  },
  location: {
    fontSize: 16,
    fontFamily: 'Nuinto',
    color: "white",
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nuinto',
    color: "white",
  },
  vaccine: {
    fontFamily: 'Nuinto',
    fontSize: 16,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    padding: 0,
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1c1c1c",
  },
  map: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: "#0492b2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  btn: {
    width: 60 * vw,
    height: 7 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 100,
  },
  btnText: {
    padding: 0,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'NuintoEBold',
    fontSize: 16, 
  },
});

export default Food;
