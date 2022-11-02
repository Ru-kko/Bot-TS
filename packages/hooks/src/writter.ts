import { useState } from "react";

interface flikerConfig {
  lineFliker?: boolean;
  flikerCount?: number;
  initialText?: String;
}

export function useWritter<T>(
  inpText: string,
  config?: flikerConfig,
  callback?: () => T | Promise<T>
): [String, () => void] {
  const [text, setText] = useState<String>(config?.initialText ?? "");

  const run = async () => {
    await new Promise(async () => {
      if (config?.lineFliker) {
        await new Promise<void>((resolve) => {
          var lineCounter = 0;
          const repetitions = config?.flikerCount || 7;

          let intervalLine = setInterval(() => {
            if (lineCounter % 2 == 0) setText("|");
            else setText(" ");
            lineCounter++;
            if (lineCounter >= repetitions) {
              clearInterval(intervalLine);
              resolve();
            }
          }, 500);
        });
      }
      await new Promise<void>((resolve) => {
        var textIndex = 0;

        let textInterval = setInterval(() => {
          if (textIndex >= inpText.length) {
            clearInterval(textInterval);
            setTimeout(() => {
              resolve();
            }, 500);
          }
          if (config?.lineFliker) {
            setText(inpText.slice(0, textIndex) + "|");
          } else {
            setText(inpText.slice(0, textIndex));
          }

          textIndex++;
        }, 150);
      });
      callback?.();
    });
  };
  return [text, run];
}
