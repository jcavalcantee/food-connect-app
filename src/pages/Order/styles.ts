import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a1a1a1',
    marginBottom: 4,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  codeContainer: {
    marginBottom: 20,
  },
  codeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  codeBox: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    alignItems: 'center',
    borderRadius: 6,
  },
  code: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFilled: {
    flex: 0.5,
    backgroundColor: '#e53935',
  },
  progressBarEmpty: {
    flex: 0.5,
    backgroundColor: '#ccc',
  },
  statusText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 15,
    marginBottom: 4,
  },
  storeLocation: {
    fontSize: 15,
    color: '#555',
  },
  observationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

