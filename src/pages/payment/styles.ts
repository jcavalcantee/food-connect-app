import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#888',
  },
  instruction: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  copyButton: {
    paddingHorizontal: 8,
  },
  copyText: {
    fontSize: 18,
  },
  timerLabel: {
    fontSize: 14,
    color: '#444',
    alignSelf: 'flex-start'
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'red',
  },
});
