import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Rule, Rules } from './rules';

const theme = useTheme();

interface ModalRulesProps {
  visible: boolean;
  onCloseButtonClick: (rules: Rules) => void;
  rules: Rules;
}

export const ModalRules = ({ visible, onCloseButtonClick, rules }: ModalRulesProps) => {
  const [rulesUpdated, setRulesUpdated] = useState<Rules>(rules);

  const firstErrorFound = Object.values(rules)
    .map((rule: Rule<any>) => rule.error)
    .find((error) => error);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.rulesContainer}>
            <View style={[styles.rulesRow, rules.valueToWin.error && styles.ruleError]}>
              <Text style={styles.ruleText}>Valeur pour gagner</Text>
              <TextInput
                onChangeText={(value) =>
                  setRulesUpdated({
                    ...rulesUpdated,
                    valueToWin: { ...rulesUpdated.valueToWin, value: parseInt(value) },
                  })
                }
                value={Number.isNaN(rulesUpdated.valueToWin.value) ? '' : rulesUpdated.valueToWin.value.toString()}
                placeholder={'10000'}
                keyboardType='numeric'
                style={styles.ruleInput}
              />
            </View>
            <View style={styles.rulesRow}>
              <Text style={styles.ruleText}>Barrer les scores</Text>
              <Switch
                trackColor={{ true: theme.secondary, false: theme.secondary }}
                thumbColor={theme.primary}
                onValueChange={(value) =>
                  setRulesUpdated({
                    ...rulesUpdated,
                    saveScoreCancelsOthers: { ...rulesUpdated.saveScoreCancelsOthers, value: value },
                  })
                }
                value={rulesUpdated.saveScoreCancelsOthers.value}
                style={styles.ruleSwitch}
              />
            </View>
          </View>

          <Text style={styles.errorMessage}>{firstErrorFound?.message}</Text>

          <Pressable
            style={({ pressed }) => [styles.button, pressed ? styles.buttonClose : styles.buttonClosePressed]}
            onPress={() => onCloseButtonClick(rulesUpdated)}
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
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: theme.background,
  },
  rulesContainer: { flex: 0.9, gap: 10 },
  rulesRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.primary,
  },
  ruleError: { borderWidth: 2, borderRadius: 10, borderColor: 'red' },
  ruleText: { width: '70%', fontSize: 15, color: theme.primary },
  ruleSwitch: { width: '30%' },
  ruleInput: { width: '30%' },
  errorMessage: { flex: 0.08, color: 'red', paddingTop: 5 },
  button: { flex: 0.2, justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  buttonClose: { backgroundColor: theme.secondary },
  buttonClosePressed: { backgroundColor: theme.primary },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
