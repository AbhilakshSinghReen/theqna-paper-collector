import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function QuestionRenderer({ questionData, paperMedia }) {
  const questionLevel = questionData.designator.split(".").length;
  const designatorAndWeightageFontSize = 24 - questionLevel * 2;
  const questionTextFontSize = 24 - questionLevel * 2;

  const parseTextToElements = (textStr) => {
    const elements = [];

    const paragraphs = textStr.split("\n");
    for (const paragraph of paragraphs) {
      if (paragraph.trimStart().trimEnd().length === 0) {
        continue;
      }

      if (paragraph.startsWith("{{math")) {
        const mathContent = paragraph.substring("{{math".length, paragraph.length - 2);
        elements.push({
          type: "math",
          content: mathContent,
        });
      } else if (paragraph.startsWith("{{media")) {
        const fileId = paragraph.slice(16, -4);
        let fileData;
        for (const imageFile of paperMedia.images) {
          if (imageFile.fileId === fileId) {
            fileData = imageFile.data;
          }
        }

        elements.push({
          type: "media",
          data: fileData,
        });
      } else if (paragraph.startsWith("{{table")) {
      } else {
        elements.push({
          type: "text",
          content: paragraph,
        });
      }
    }

    return elements;
  };

  const questionRenderElements = parseTextToElements(questionData.content.questionText);
  const answerRenderElements = parseTextToElements(questionData.content.answerText);
  console.log(answerRenderElements);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      mb={(7 - questionLevel) / 2}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={(7 - questionLevel) / 10}
      >
        <Box>
          <Typography
            variant="p"
            sx={{
              fontSize: designatorAndWeightageFontSize,
            }}
          >
            <strong>{questionData.designator}</strong>
          </Typography>
        </Box>

        <Box width="50%" display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              width: {
                xs: "8%",
                sm: "6%",
                md: "5%",
                lg: "4%",
                xl: "3%",
              },
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: designatorAndWeightageFontSize,
              }}
            >
              <strong>{questionData.weightage !== 0 ? questionData.weightage : ""}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box width="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
        <MathJaxContext>
          <Typography
            variant="p"
            sx={{
              fontSize: questionTextFontSize,
            }}
          >
            {questionRenderElements.map((element, index) => {
              if (element.type === "math") {
                return <MathJax key={index}>{element.content}</MathJax>;
              } else if (element.type === "media") {
                return (
                  <Box width="100%" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                    <img
                      src={element.data}
                      key={index}
                      style={{
                        display: "block",
                        maxWidth: "75%",
                        maxHeight: "75%",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </Box>
                );
              } else {
                return (
                  <p key={index}>
                    <strong>{element.content}</strong>
                  </p>
                );
              }
            })}
          </Typography>

          {answerRenderElements.map((element, index) => {
            if (element.type === "math") {
              return <MathJax key={index}>{element.content}</MathJax>;
            } else if (element.type === "media") {
              return (
                <Box width="100%" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                  <img
                    src={element.data}
                    key={index}
                    style={{
                      display: "block",
                      maxWidth: "75%",
                      maxHeight: "75%",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                </Box>
              );
            } else {
              return <p key={index}>{element.content}</p>;
            }
          })}
        </MathJaxContext>
      </Box>
    </Box>
  );
}
