import React, { useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const CoverLetterForm: React.FC = () => {
  const [jobPosterPreview, setJobPosterPreview] = useState<string | null>(null);
  const [cvPreview, setCvPreview] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleJobPosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setJobPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const language = (document.querySelector('input[name="language"]:checked') as HTMLInputElement)?.value || 'english';
      const response = await axios.post('/api/generate', {
        jobPoster: jobPosterPreview,
        cv: cvPreview,
        language: language,
      });

      setCoverLetter(response.data.coverLetter);
    } catch (err) {
      console.error('Error details:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'An error occurred while generating the cover letter');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generate Cover Letter</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="jobPoster">Upload Job Poster (Image)</Label>
            <Input id="jobPoster" type="file" accept="image/*" required onChange={handleJobPosterChange} />
            {jobPosterPreview && (
              <div className="mt-2">
                <img src={jobPosterPreview} alt="Job Poster Preview" className="w-full h-auto" />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="cv">Upload CV (PDF/DOC)</Label>
            <Input id="cv" type="file" accept=".pdf,.doc,.docx" required onChange={handleCvChange} />
            {cvPreview && (
              <div className="mt-2">
                <iframe src={cvPreview} className="w-full h-64" title="CV Preview" />
              </div>
            )}
          </div>
          <div>
            <Label>Select Language</Label>
            <RadioGroup defaultValue="english" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="indonesian" id="indonesian" />
                <Label htmlFor="indonesian">Bahasa Indonesia</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Cover Letter'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {coverLetter && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Generated Cover Letter:</h3>
            <p>{coverLetter}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoverLetterForm; 