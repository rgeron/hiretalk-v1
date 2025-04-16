import { prisma } from "@/lib/prisma";

export async function getTemplateDetails(templateId: string) {
  const template = await prisma.template.findUnique({
    where: {
      id: templateId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      organizationId: true,
    },
  });

  if (!template) {
    return null;
  }

  // Get template questions
  const questions = await prisma.templateQuestion.findMany({
    where: {
      templateId,
    },
    select: {
      id: true,
      question: true,
      order: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return {
    ...template,
    questions,
  };
}

export async function updateTemplate(
  templateId: string,
  data: {
    name?: string;
    description?: string | null;
  },
) {
  return prisma.template.update({
    where: {
      id: templateId,
    },
    data,
  });
}

export async function updateTemplateQuestion(
  questionId: string,
  data: {
    question: string;
  },
) {
  return prisma.templateQuestion.update({
    where: {
      id: questionId,
    },
    data,
  });
}

export async function addTemplateQuestion(
  templateId: string,
  data: {
    question: string;
  },
) {
  // Get the highest order
  const highestOrder = await prisma.templateQuestion.findFirst({
    where: {
      templateId,
    },
    orderBy: {
      order: "desc",
    },
    select: {
      order: true,
    },
  });

  const nextOrder = (highestOrder?.order ?? 0) + 1;

  return prisma.templateQuestion.create({
    data: {
      templateId,
      question: data.question,
      order: nextOrder,
      category: "job_offer",
    },
  });
}

export async function deleteTemplateQuestion(questionId: string) {
  return prisma.templateQuestion.delete({
    where: {
      id: questionId,
    },
  });
}
