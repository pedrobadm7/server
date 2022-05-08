import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  test('it should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a bug',
      screenshot: 'data:image/png;base64,asdadsasdasda'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  test('it should not be able to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'This is a bug',
      screenshot: 'data:image/png;base64,asdadsasdasda'
    })).rejects.toThrow();
  });

  test('it should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asdadsasdasda'
    })).rejects.toThrow();
  });

  test('it should not be able to submit a feedback with incorrect screenshot format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Everything is buged',
      screenshot: 'screenshot.jpeg'
    })).rejects.toThrow();
  });

});