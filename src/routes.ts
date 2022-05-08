import { Request, Response, Router } from 'express';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodeMailerMailAdapter';

const router = Router();

router.post('/feedbacks', async (req: Request, res: Response) => {
  const {type, comment, screenshot} = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbackRepository();
  const nodeMailerMailadapter = new NodeMailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerMailadapter);

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send();
  } catch(err) {
    console.log(err)
  }
})

export { router }