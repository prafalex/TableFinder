import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { Colours } from "../variables/colours.js";
import Button from "./utils/Button.js";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function ReviewForm({
  cancelHandler,
  deleteHandler,
  upsertHandler,
  isNewReview,
  defaultValues,
}) {
  const [inputValues, setInputValues] = useState({
    title: defaultValues ? defaultValues.title : "",
    content: defaultValues ? defaultValues.content : "",
    score: defaultValues ? defaultValues.score.toString() : "",
  });

  function inputChangedHandler(inputId, value) {
    setInputValues((currentInputValues) => {
      return { ...currentInputValues, [inputId]: value };
    });
  }

  function submitHandler() {
    const reviewData = {
      title: inputValues.title,
      content: inputValues.content,
      score: +inputValues.score,
    };
    const titleIsValid = reviewData.title.trim().length > 0;
    const scoreIsValid =
      !isNaN(reviewData.score) && reviewData.score > 0 && reviewData.score <= 5;

    if (!titleIsValid || !scoreIsValid) {
      Alert.alert("Invalid values", "Please check the entered values!");
      return;
    }
    upsertHandler(reviewData);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          maxLength={64}
          placeholder="Title"
          onChangeText={inputChangedHandler.bind(this, "title")}
          value={inputValues.title}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          multiline={true}
          maxLength={256}
          placeholder="Content"
          onChangeText={inputChangedHandler.bind(this, "content")}
          value={inputValues.content}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Score</Text>
        <TextInput
          style={[styles.input]}
          keyboardType="number-pad"
          placeholder="1-5"
          onChangeText={inputChangedHandler.bind(this, "score")}
          value={inputValues.score}
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={{'button': styles.button, 'buttonText': styles.buttonText}} onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={{'button': styles.button, 'buttonText': styles.buttonText}} onPress={submitHandler}>
          {isNewReview ? "Add" : "Edit"}
        </Button>
        {!isNewReview && (
          <Button style={{'button': styles.deleteButton}} onPress={deleteHandler}>
            <Ionicons name="trash" size={20} color={Colours.textSecondaryColor} />
          </Button>
        )}
      </View>
    </View>
  );
}

export default ReviewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colours.textColor,
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 4,
    fontSize: 18,
    color: Colours.textColor,
  },
  contentInput: {
    minHeight: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    paddingTop: 20,
  },
  button: {
    backgroundColor: Colours.primaryColor,
    width: 120,
  },
  buttonText: {
    color: Colours.textSecondaryColor
  },
  deleteButton: {
    width: 70,
    backgroundColor: Colours.errorMain,
  }
});
