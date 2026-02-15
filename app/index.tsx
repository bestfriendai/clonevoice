import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

type RecordingState = 'idle' | 'recording' | 'recorded';

export default function HomeScreen() {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [playback, setPlayback] = useState<Audio.Sound | null>(null);
  const [lastUri, setLastUri] = useState<string | null>(null);

  const revenueCatApiKey = useMemo(() => {
    const extra = Constants.expoConfig?.extra as { revenuecat_api_key?: string } | undefined;
    return extra?.revenuecat_api_key;
  }, []);

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.INFO);

    if (revenueCatApiKey && revenueCatApiKey !== 'rcap_key_placeholder') {
      Purchases.configure({ apiKey: revenueCatApiKey });
    }

    return () => {
      void playback?.unloadAsync();
      void recording?.stopAndUnloadAsync();
    };
  }, [playback, recording, revenueCatApiKey]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setRecordingState('recording');
    } catch {
      Alert.alert('Recording error', 'Could not start recording.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setLastUri(uri ?? null);
    setRecording(null);
    setRecordingState('recorded');
  };

  const playRecording = async () => {
    if (!lastUri) return;

    const { sound } = await Audio.Sound.createAsync({ uri: lastUri });
    setPlayback(sound);
    await sound.playAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>CloneVoice</Text>
        <Text style={styles.subtitle}>Real microphone recording + playback (no mock data)</Text>

        <Pressable
          style={styles.button}
          onPress={recordingState === 'recording' ? stopRecording : startRecording}
        >
          <Text style={styles.buttonText}>
            {recordingState === 'recording' ? 'Stop recording' : 'Start recording'}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, !lastUri && styles.buttonDisabled]}
          disabled={!lastUri}
          onPress={playRecording}
        >
          <Text style={styles.buttonText}>Play last recording</Text>
        </Pressable>

        <Text style={styles.status}>Status: {recordingState}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  title: {
    color: '#f9fafb',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#d1d5db',
  },
  button: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  status: {
    color: '#d1d5db',
  },
});
