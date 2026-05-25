import { colors } from '@/constants/theme';
import { Modal, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Rules } from './rules';

interface ModalRulesProps {
  visible: boolean;
  onCloseModal: () => void;
  rules: Rules;
  onRulesUpdated: (rules: Rules) => void;
}

export const ModalRules = ({ visible, onCloseModal, rules, onRulesUpdated }: ModalRulesProps) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.rulesContainer}>
            <View style={styles.rulesRow}>
              <Text style={styles.ruleText}>Barrer les scores</Text>
              <Switch
                trackColor={{ true: colors.secondary, false: colors.secondary }}
                thumbColor={colors.primary}
                onValueChange={() =>
                  onRulesUpdated({ ...rules, saveScoreCancelsOthers: !rules.saveScoreCancelsOthers })
                }
                value={rules.saveScoreCancelsOthers}
                style={styles.ruleSwitch}
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.buttonRow,
              styles.button,
              pressed ? styles.buttonClose : styles.buttonClosePressed,
            ]}
            onPress={onCloseModal}
          >
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'stretch', padding: 40 },
  modalView: {
    flex: 0.4,
    borderRadius: 20,
    padding: 25,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: colors.background,
  },
  rulesContainer: { flex: 0.9 },
  rulesRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  ruleText: { flex: 0.7, fontSize: 15, color: colors.primary },
  ruleSwitch: { flex: 0.2 },
  buttonRow: { flex: 0.05 },
  button: { flex: 0.1, justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  buttonClose: { backgroundColor: colors.secondary },
  buttonClosePressed: { backgroundColor: colors.primary },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
