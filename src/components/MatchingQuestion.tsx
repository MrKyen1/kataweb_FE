import React, { useMemo } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { motion } from "framer-motion";

interface MatchingQuestionProps {
  question: any;
  value?: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  showFeedback?: boolean;
  correctAnswer?: Record<string, string>;
}

const DraggableItem = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileDrag={{ scale: 1.05 }}
      className="px-4 py-2 bg-white dark:bg-slate-700 border rounded-xl shadow-sm cursor-grab text-sm font-semibold text-slate-700 dark:text-slate-200 hover:shadow-md transition"
    >
      {label}
    </motion.div>
  );
};

const DropZone = ({ id, children, matchedValue, isCorrect, showFeedback }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-3 rounded-2xl border min-h-[56px] flex items-center justify-between gap-3 transition
        ${
          showFeedback
            ? isCorrect
              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
              : matchedValue
                ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                : "border-slate-200"
            : "border-slate-200 dark:border-slate-600"
        }
      `}
    >
      <span className="font-medium text-slate-700 dark:text-slate-200">
        {id}
      </span>

      {matchedValue && (
        <span className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
          {matchedValue}
        </span>
      )}
    </div>
  );
};

export const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
  question,
  value = {},
  onChange,
  showFeedback,
  correctAnswer = {},
}) => {
  const leftItems = question.leftItems || [];
  const rightItems = question.rightItems || [];

  // ✅ shuffle right items (only once)
  const shuffledRight = useMemo(() => {
    return [...rightItems].sort(() => Math.random() - 0.5);
  }, [rightItems]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const leftKey = over.id as string;
    const rightValue = active.id as string;

    onChange({
      ...value,
      [leftKey]: rightValue,
    });
  };

  const usedValues = Object.values(value);

  return (
    <div className="flex flex-col gap-6">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-500 uppercase">
              Match
            </h3>

            {leftItems.map((item) => {
              const matched = value[item];
              const isCorrect = correctAnswer[item] === matched;

              return (
                <DropZone
                  key={item}
                  id={item}
                  matchedValue={matched}
                  isCorrect={isCorrect}
                  showFeedback={showFeedback}
                />
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-500 uppercase">
              Options
            </h3>

            {shuffledRight.map((item) => {
              // ✅ hide if used
              if (usedValues.includes(item)) return null;

              return <DraggableItem key={item} id={item} label={item} />;
            })}
          </div>
        </div>
      </DndContext>

      {/* ✅ hint */}
      {!showFeedback && (
        <p className="text-xs text-slate-400 text-center">
          Kéo đáp án bên phải vào ô tương ứng bên trái
        </p>
      )}
    </div>
  );
};
